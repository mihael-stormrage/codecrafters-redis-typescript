import RedisCall from './RedisCall.ts';
import { encodeBulk } from 'src/encoder.ts';

class RedisCallEcho extends RedisCall<'echo', [string]> {
  readonly name = 'echo';
  readonly length = 1;

  method(msg: string) {
    return encodeBulk([msg]);
  }
}

export { RedisCallEcho };
