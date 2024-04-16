const encodeSimple = (data: string) => `+${data}\r\n`;
const encodeBulk = (data: string): string => {
  if (!data) return '$-1\r\n';
  return `$${data.length}\r\n${data}\r\n`;
};
const encodeBulkMultiline = (lines: string[]) => encodeBulk(lines.join('\r\n'));
const encodeArray = (data: string[]) => {
  const encoded = data.map((k) => encodeBulk(k)).join('');
  return `*${data.length}\r\n${encoded}`;
};

export { encodeSimple, encodeBulk, encodeBulkMultiline, encodeArray };
