import { decodeBase64 } from 'std/encoding/base64.ts';

interface ReplicaInfo {
  role: 'master' | 'slave';
  master_replid: string,
  master_repl_offset: number,
}

const replica: ReplicaInfo = {
  role: 'master',
  master_replid: '8371b4fb1155b71f4a04d3e1bc3e18c4a990aeeb',
  master_repl_offset: 0,
}

const emptyRdbBase64
  = 'UkVESVMwMDEx+glyZWRpcy12ZXIFNy4yLjD6CnJlZGlzLWJpdHPAQPoFY3Rp'
  + 'bWXCbQi8ZfoIdXNlZC1tZW3CsMQQAPoIYW9mLWJhc2XAAP/wbjv+wP9aog==';
const emptyRdb = decodeBase64(emptyRdbBase64);
const lengthPrefix = `$${emptyRdb.length}\r\n`;

export default replica;
export type { ReplicaInfo };
export { emptyRdb, lengthPrefix };
