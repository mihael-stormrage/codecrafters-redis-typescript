import { encodeArray } from './encoder.ts';
import replica from './Replica.ts';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const sendTcp = async (msg: string[], connection: Deno.TcpConn) => {
  await connection.write(encoder.encode(encodeArray(msg)));
  const reader = connection.readable.getReader();
  const { value } = await reader.read();
  reader.releaseLock();
  const [typeByte, ...val] = decoder.decode(value);
  if (typeByte !== '+') throw new Error(`Remote server responded with an error: ${val}`);
  return val.join('').trim();
};

type ReqToMaster = [cmd: string[], expected: string, errMsg: string];

const replicaWarmUp = async (masterHost: string, masterPort: string | number, port: string) => {
  replica.role = 'slave';
  const replconfErrMsg = "Replconf isn't ok";
  const requests: ReqToMaster[] = [
    [['ping'], 'PONG', "Master didn't pong"],
    [['REPLCONF', 'listening-port', port], 'OK', replconfErrMsg],
    [['REPLCONF', 'capa', 'psync2'], 'OK', replconfErrMsg],
    [['PSYNC', '?', '-1'], 'FULLRESYNC ? 0', "Master isn't synced"],
  ];
  const connToMaster = await Deno.connect({ hostname: masterHost, port: Number(masterPort) });
  for (const [cmd, expected, errMsg] of requests) {
    const response = await sendTcp(cmd, connToMaster);
    if (response !== expected) throw new Error(`${errMsg}, instead: ${response}`);
  }
};

export default replicaWarmUp;
