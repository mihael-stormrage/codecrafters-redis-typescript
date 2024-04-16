import RedisCall from './RedisCall.ts';
import cache from 'src/kv.ts';
import { encodeBulk } from 'src/encoder.ts';

class RedisCallGet extends RedisCall {
  readonly minArgs = 1;
  readonly maxArgs = 1;

  method(): string {
    const [k] = this.argumentsList;
    const { [k]: { value } } = cache;
    return encodeBulk(value);
  }
}

export { RedisCallGet };
