import RedisCall from './RedisCall.ts';
import { encodeBulk } from 'src/encoder.ts';

class RedisCallEcho extends RedisCall {
  readonly minArgs = 1;
  readonly maxArgs = 1;

  method() {
    const [msg] = this.argumentsList;
    return encodeBulk(msg);
  }
}

export { RedisCallEcho };
