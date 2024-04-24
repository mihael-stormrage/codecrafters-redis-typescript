const decodeInline = (data: string): string[][] => data
  .split('\r\n')
  .map(line => line.split(' '));

const decodeResp = (data: string): string[][] => data
  .split(/\*\d+\r\n/)
  .map((cmd) => cmd.split(/\$\d+\r\n/));

const _cutRdb = (v: string) => {
  if (!v.startsWith('REDIS')) return v;
  return v.match(/^REDIS.+(\*\d+)$/s)?.[1] ?? '';
};

const cleanup = (data: string[]): string[] => data
  .map((v) => _cutRdb(v).trim())
  .filter((v) => v.length);

const decode = (data: string): string[][] => {
  const isInline = !/[*$]/.test(data[0]);
  const cmds = isInline ? decodeInline(data) : decodeResp(data);
  return cmds.map(cleanup)
    .filter((v) => v.length);
};

export default decode;
export { _cutRdb };
