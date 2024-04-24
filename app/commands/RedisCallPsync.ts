import { toUint8Arr, concatUint8Array, encodeSimple } from 'src/encoder.ts';
import replica, { emptyRdb, lengthPrefix } from 'src/Replica.ts';
import RedisCall from './RedisCall.ts';

class RedisCallPsync extends RedisCall {
  readonly minArgs = 2;
  readonly maxArgs = 2;

  method() {
    const [_replId, _replOffset] = this.argumentsList;
    const { master_replid, master_repl_offset } = replica;
    const fullResyncMsg = encodeSimple(`FULLRESYNC ${master_replid} ${master_repl_offset}`);
    return concatUint8Array(...[fullResyncMsg, lengthPrefix, emptyRdb].map(toUint8Arr));
  }
}

export { RedisCallPsync };
