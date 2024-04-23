import { decodeBase64 } from 'std/encoding/base64.ts';
import { concatUint8Array, encodeSimple } from 'src/encoder.ts';
import RedisCall from './RedisCall.ts';
import replica from 'src/Replica.ts';

const encoder = new TextEncoder();

const emptyRdbBase64
  = 'UkVESVMwMDEx+glyZWRpcy12ZXIFNy4yLjD6CnJlZGlzLWJpdHPAQPoFY3Rp'
  + 'bWXCbQi8ZfoIdXNlZC1tZW3CsMQQAPoIYW9mLWJhc2XAAP/wbjv+wP9aog==';
const emptyRdb = decodeBase64(emptyRdbBase64);
const lengthPrefix = encoder.encode(`$${emptyRdb.length}\r\n`);

class RedisCallPsync extends RedisCall {
  readonly minArgs = 2;
  readonly maxArgs = 2;

  method() {
    const [_replId, _replOffset] = this.argumentsList;
    const { master_replid, master_repl_offset } = replica;
    const fullResyncMsg = encodeSimple(`FULLRESYNC ${master_replid} ${master_repl_offset}`);
    return concatUint8Array(encoder.encode(fullResyncMsg), lengthPrefix, emptyRdb);
  }
}

export { RedisCallPsync };
