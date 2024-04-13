interface ReplicaInfo {
  role: 'master' | 'slave';
}

export const replica: ReplicaInfo = {
  role: 'master',
};

export default replica;
export type { ReplicaInfo };
