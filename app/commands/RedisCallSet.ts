import RedisCall from './RedisCall.ts';
import cache, { CachedKey } from 'src/kv.ts';
import { encodeSimple } from 'src/encoder.ts';

class RedisCallSet extends RedisCall {
  readonly minArgs = 1;
  readonly maxArgs = 4;

  method(): string {
    const [k, v, modificator, modValue] = this.argumentsList;
    const px = modificator?.toLowerCase() === 'px' && modValue;
    cache[k] = new CachedKey(k, v, Number(px));
    return encodeSimple('OK');
  }
}

export { RedisCallSet };
