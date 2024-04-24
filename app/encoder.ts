const encoder = new TextEncoder();

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

const toUint8Arr = (v: string | Uint8Array) => typeof v === 'string' ? encoder.encode(v) : v;

const concatUint8Array = (...uint8Arrays: Uint8Array[]): Uint8Array => {
  const totalLength = uint8Arrays.reduce((acc, curr) => acc + curr.length, 0);
  const mergedArray = new Uint8Array(totalLength);
  const iter = (i = 0, offset = 0): void => {
    if (i >= uint8Arrays.length) return;
    mergedArray.set(uint8Arrays[i], offset);
    return iter(i + 1, offset + uint8Arrays[i].length);
  };
  iter();
  return mergedArray;
};

export { encodeSimple, encodeBulk, encodeBulkMultiline, encodeArray, toUint8Arr, concatUint8Array };
