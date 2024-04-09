const encodeSimple = (data: string) => `+${data}\r\n`;
const encodeBulk = (data: string[]): string => {
  if (data.length === 1) {
    const [value] = data;
    if (!value) return '$-1\r\n';
    return `$${value.length}\r\n${value}\r\n`;
  }
  const encoded = data.map((k) => encodeBulk([k])).join('');
  return `*${data.length}\r\n${encoded}`;
};

export { encodeSimple, encodeBulk };
