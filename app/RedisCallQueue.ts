import RedisCall from './commands/RedisCall.ts';
import newRedisCall, { isCommand } from './commands/commands.ts';

// TODO: state machine? : NEW_COMMAND, SET, ARGUMENTS(?)
//  or state for each command (accepting arguments)

class RedisCallQueue {
  calls: RedisCall[] = [];

  get last() {
    return this.calls[this.calls.length - 1];
  }

  readable() {
    const promises = this.calls
      .map((redisCall) => new Promise<Uint8Array>(redisCall.exec));
    return ReadableStream.from(promises);
  }

  push(key: string) {
    // TODO?: new Parser() with state machine
    if (this.last?.isWaitingArgs) return this.last.push(key);
    const com = key.toLowerCase();
    isCommand(com);
    this.calls.push(newRedisCall(com));
  }
}

export default RedisCallQueue;
