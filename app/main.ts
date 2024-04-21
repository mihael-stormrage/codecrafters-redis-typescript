import { createServer } from 'node:net';
import { parseArgs } from 'std/cli/parse_args.ts';
import parse from './parser.ts';
import replica from './Replica.ts';
import { encodeArray } from './encoder.ts';

const encoder = new TextEncoder();

const { port, replicaof: masterHost, _:  masterPort} = parseArgs(Deno.args, {
  string: ['port', 'replicaof'],
  default: { port: 6379 },
});

const sendTcp = async (msg: string,  options: Deno.ConnectOptions) => {
  const connToMaster = await Deno.connect(options);
  await connToMaster.write(encoder.encode(encodeArray([msg])));
  void connToMaster.readable.pipeTo(Deno.stdout.writable);
};

const greeting = `Listening on 127.0.0.1:${port}`;
const replicaOf = `-- replica of: ${masterHost}:${masterPort}`;
if (masterHost) {
  replica.role = 'slave';
  console.log(greeting, replicaOf);
  await sendTcp('ping', { hostname: masterHost, port: Number(masterPort) });
}

const server = createServer((connection) => {
  connection.on('data', (data) => {
    const queue = parse(data.toString());
    queue.calls.forEach((call) => {
      connection.write(call.exec());
    });
  });
});

server.listen(Number(port), '127.0.0.1');
