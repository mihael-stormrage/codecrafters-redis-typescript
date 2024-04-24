import type { ComKey } from './commands.ts';
import { toUint8Arr } from 'src/encoder.ts';
import replica from 'src/Replica.ts';

abstract class RedisCall {
  abstract readonly minArgs: number;
  abstract readonly maxArgs: number;
  readonly isWrite: boolean = false;

  constructor(public readonly name: ComKey, public argumentsList: readonly string[] = []) {}

  get length() {
    return this.argumentsList.length;
  }

  abstract method(): string | Uint8Array;

  exec(): Uint8Array | void {
    this.validateArgs();
    const result = toUint8Arr(this.method());
    if (!this.isWrite) return result;
    if (replica.role === 'slave') return;
    return result;
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
