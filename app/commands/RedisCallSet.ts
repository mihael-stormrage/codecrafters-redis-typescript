import RedisCall from './RedisCall.ts';
import cache, { CachedKey } from 'src/kv.ts';
import { encodeSimple } from 'src/encoder.ts';

class RedisCallSet extends RedisCall<'set', [string, string] | [string, string, string]> {
  readonly name = 'set';
  length = 2 as const;

  method(k: string, v: string, px?: string): string {
    cache[k] = new CachedKey(k, v, Number(px));
    return encodeSimple('OK');
  }
}

export { RedisCallSet };
