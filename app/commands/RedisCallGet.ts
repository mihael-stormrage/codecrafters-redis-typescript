import RedisCall from './RedisCall.ts';
import cache from 'src/kv.ts';
import { encodeBulk } from 'src/encoder.ts';

class RedisCallGet extends RedisCall<'get', [string]> {
  readonly name = 'get';
  readonly length = 1;

  method(k: string): string {
    const { [k]: { value } } = cache;
    return encodeBulk([value]);
  }

}

export { RedisCallGet };
