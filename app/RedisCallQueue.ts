import RedisCall from './RedisCall.ts';
import { isCommand } from './commands.ts';

class RedisCallQueue {
  calls: RedisCall[] = [];

  get last() {
    return this.calls[this.calls.length - 1];
  }

  readable() {
    const promises = this.calls
      .map((redisCall) => new Promise<Uint8Array>(redisCall.call));
    return ReadableStream.from(promises);
  }

  push(key: string) {
    if (this.last?.isWaitingArgs) return this.last.push(key);
    const com = key.toLowerCase();
    isCommand(com);
    this.calls.push(new RedisCall(com));
  }
}

export default RedisCallQueue;
