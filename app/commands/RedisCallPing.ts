import RedisCall from './RedisCall.ts';
import { encodeSimple } from 'src/encoder.ts';

class RedisCallPing extends RedisCall<'ping', [] | [string]> {
  readonly name = 'ping';
  length = 0 as const;

  // TODO: implement ECHO if argument present
  method(_msg?: string) {
    return encodeSimple('PONG');
  }
}

export { RedisCallPing };
