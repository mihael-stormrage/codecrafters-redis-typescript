import type { ComKey } from './commands.ts';

abstract class RedisCall<
  N extends ComKey = ComKey,
  A extends unknown[] = unknown[]
> {
  abstract readonly name: N;
  abstract length: Parameters<typeof this.method>['length'];
  argumentsList: unknown[] = [];

  abstract method(...args: A): string;

  get isWaitingArgs() {
    return this.argumentsList.length < this.length;
  }

  get query() {
    return `${this.name} ${this.argumentsList.join(' ')}`;
  }

  exec = () => this.method(...this.argumentsList as A);

  push(arg: typeof this.argumentsList[number]) {
    if (!this.isWaitingArgs) {
      throw new Error(`Too many arguments: ${this.query}`);
    }
    this.argumentsList.push(arg);
  }
}

export default RedisCall;
