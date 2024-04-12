import RedisCall from './commands/RedisCall.ts';
import newRedisCall, { isCommand } from './commands/commands.ts';
import { isInfoSection } from './commands/infoSections.ts';

// TODO: state machine? : NEW_COMMAND, SET, ARGUMENTS(?)
//  or state for each command (accepting arguments)
//  possibly: split FSM in separate class with transitions for every state
//  to move transition logic away from call's modification logic

enum State {
  NEW_COMMAND = 'NEW_COMMAND',
  WAITING_ARGS = 'WAITING_ARGS',
  SET = 'SET',
  INFO = 'INFO',
}

/* TODO: Flat implementation??:
 *  Parser should only split data into commands[][],
 *  calls should not have length, only exception handlers
 *
 *   const p = new Parser(raw data)
 *   const q = new Queue(p.commands())
 *
 *  later on implement iterable Parser, which can be attached to server stream
 *  asynchronously iterate over Parser and enqueue new tasks in Queue
 */

// FIXME: Pipelining should only be available in inline format
//  Implement inline mode

class Parser {
  state: State = State.NEW_COMMAND;

  #setState(state: State) {
    this.state = state;
  }

  constructor(private redisCallQueue: RedisCallQueue) {
  }

  get lastCall() {
    return this.redisCallQueue.last;
  }

  #newCall(key: string) {
    isCommand(key);
    this.redisCallQueue.calls.push(newRedisCall(key));
  }

  #pushArg = (key: string) => this.lastCall.push(key);

  _moreArgs = () => this.lastCall.length++;

  #nextToken() {
    switch (this.lastCall.name) {
      case 'set':
        return this.#setState(State.SET);
      case 'info':
        return this.#setState(State.INFO);
      default: {
        if (!this.lastCall.isWaitingArgs) return this.#setState(State.NEW_COMMAND);
        this.#setState(State.WAITING_ARGS);
      }
    }
  }

  [State.NEW_COMMAND](key: string) {
    this.#newCall(key.toLowerCase());
  }

  [State.WAITING_ARGS](key: string) {
    this.#pushArg(key);
  }

  [State.SET](key: string) {
    if (key.toLowerCase() === 'px') return this._moreArgs();
    if (this.lastCall.isWaitingArgs) return this.#pushArg(key);
    return this.#parseTokenAsDefault(key);
  }

  [State.INFO](key: string) {
    const section = key.toLowerCase();
    if (!isInfoSection(section)) return this.#parseTokenAsDefault(key);
    this._moreArgs();
    this.#pushArg(section);
  }

  #parseTokenAsDefault(key: string) {
    this.#setState(State.NEW_COMMAND);
    this.parseToken(key);
  }

  parseToken(key: string) {
    this[this.state](key);
    this.#nextToken();
  }
}

class RedisCallQueue {
  calls: RedisCall[] = [];
  parser = new Parser(this);

  get last() {
    return this.calls[this.calls.length - 1];
  }

  readable() {
    const promises = this.calls
      .map((redisCall) => new Promise<Uint8Array>(redisCall.exec));
    return ReadableStream.from(promises);
  }

  push(key: string) {
    this.parser.parseToken(key);
  }
}

export default RedisCallQueue;
