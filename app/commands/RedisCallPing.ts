import RedisCall from './RedisCall.ts';
import { encodeBulk, encodeSimple } from 'src/encoder.ts';

class RedisCallPing extends RedisCall {
  readonly minArgs = 0;
  readonly maxArgs = 1;

  method() {
    const [msg] = this.argumentsList;
    return msg ? encodeBulk(msg) : encodeSimple('PONG');
  }
}

export { RedisCallPing };
