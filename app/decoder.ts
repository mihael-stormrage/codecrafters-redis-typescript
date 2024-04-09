const decode = (data: string): string[] => data
  .split(/\$[0-9]+\r\n/)
  .slice(1)
  .map((k) => k.trim());

export default decode;
