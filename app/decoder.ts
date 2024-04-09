const decode = (data: string): string[] => data
  .split(/\$\d+\r\n/)
  .slice(1)
  .map((k) => k.trim());

export default decode;
