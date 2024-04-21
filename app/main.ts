import { createServer } from 'node:net';
import { parseArgs } from 'std/cli/parse_args.ts';
import parse from './parser.ts';
import replicaWarmUp from './replication.ts';

const { port, replicaof: masterHost, _: [masterPort] } = parseArgs(Deno.args, {
  string: ['port', 'replicaof'],
  default: { port: '6379' },
});

const greeting = `Listening on 127.0.0.1:${port}`;
console.info(greeting);
if (masterHost) {
  const replicaOf = `  -- replica of: ${masterHost}:${masterPort}`;
  console.info(replicaOf);
  replicaWarmUp(masterHost, masterPort, port).catch(console.error);
}

const server = createServer((connection) => {
  connection.on('data', (data) => {
    try {
      const queue = parse(data.toString());
      queue.calls.forEach((call) => {
        connection.write(call.exec());
      });
    } catch (error) {
      console.error(error);
    }
  });
});

server.listen(Number(port), '127.0.0.1');
