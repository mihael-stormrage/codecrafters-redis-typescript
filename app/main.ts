import { createServer } from 'node:net';
import { parseArgs } from 'std/cli/parse_args.ts';
import ReplicaInfo from './Replica.ts';
import parse from './parser.ts';

const { port } = parseArgs(Deno.args, {
  string: ['port'],
  default: { port: 6379 },
});

export const replica: ReplicaInfo = {
  role: 'master',
};

const server = createServer((connection) => {
  connection.on('data', (data) => {
    const queue = parse(data.toString());
    queue.calls.forEach((call) => {
      connection.write(call.exec());
    });
  });
});

server.listen(Number(port), '127.0.0.1');
