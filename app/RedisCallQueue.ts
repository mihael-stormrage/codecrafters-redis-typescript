import RedisCall from './commands/RedisCall.ts';
import newRedisCall, { isCommand } from './commands/commands.ts';

/* TODO: Flat implementation??:
 *  Parser should only split data into commands[][],
 *  calls should not have length (done), only exception handlers
 *
 *   const p = new Parser(raw data)
 *   const q = new Queue(p.commands())
 *
 *  later on implement iterable Parser, which can be attached to server stream
 *  asynchronously iterate over Parser and enqueue new tasks in Queue
 */

class RedisCallQueue {
  calls: RedisCall[] = [];

  readable() {
    const promises = this.calls
      .map((redisCall) => new Promise<Uint8Array>(redisCall.exec));
    return ReadableStream.from(promises);
  }

  push(command: string[]) {
    const [com, ...args] = command;
    const name = com.toLowerCase();
    isCommand(name);
    this.calls.push(newRedisCall(name, args));
  }
}

export default RedisCallQueue;
