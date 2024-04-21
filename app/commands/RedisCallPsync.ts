import RedisCall from './RedisCall.ts';
import { encodeSimple } from 'src/encoder.ts';
import replica from 'src/Replica.ts';

class RedisCallPsync extends RedisCall {
  readonly minArgs = 2;
  readonly maxArgs = 2;

  method(): string {
    const [_replId, _replOffset] = this.argumentsList;
    const { master_replid, master_repl_offset } = replica;
    return encodeSimple(`FULLRESYNC ${master_replid} ${master_repl_offset}`);
  }
}

export { RedisCallPsync };
