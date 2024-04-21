import RedisCall from './RedisCall.ts';
import { encodeSimple } from 'src/encoder.ts';

class RedisCallReplconf extends RedisCall {
  readonly minArgs = 2;
  readonly maxArgs = 4;

  method(): string {
    const [modificator, _modValue, _modificator2] = this.argumentsList;
    if (!['listening-port', 'capa'].includes(modificator)) throw new Error(`Invalid call: ${this.query}`);
    return encodeSimple('OK');
  }
}

export { RedisCallReplconf };
