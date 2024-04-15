const decodeInline = (data: string): string[][] => data
  .split('\r\n')
  .map(line => line.split(' '));

const decodeResp = (data: string): string[][] => data
  .split(/\*\d+\r\n/)
  .map((cmd) => cmd.split(/\$\d+\r\n/));

const cleanup = (data: string[]): string[] => data
  .filter((v) => v.length)
  .map((v) => v.trim());

const decode = (data: string): string[][] => {
  const isInline = data[0] !== '*';
  const cmds = isInline ? decodeInline(data) : decodeResp(data);
  return cmds.map(cleanup)
    .filter((v) => v.length);
};

export default decode;
