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

export default replica;
export type { ReplicaInfo };
