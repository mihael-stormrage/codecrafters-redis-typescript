import type { ComKey } from './commands.ts';

abstract class RedisCall {
  abstract readonly minArgs: number;
  abstract readonly maxArgs: number;

  constructor(public readonly name: ComKey, public argumentsList: readonly string[] = []) {}

  get length() {
    return this.argumentsList.length;
  }

  abstract method(): string;

  exec() {
    this.validateArgs();
    return this.method();
  }

  get query() {
    return `${this.name} ${this.argumentsList.join(' ')}`;
  }

  protected validateArgs() {
    if (this.length <= this.maxArgs) return;
    if (this.length >= this.minArgs) return;
    const msg = `(error) wrong number of arguments (given ${this.length}, expected ${this.minArgs}..${this.maxArgs})`;
    console.error(msg);
    throw new Error(msg);
  }
}

export default RedisCall;
