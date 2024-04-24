import { parseArgs } from 'std/cli/parse_args.ts';
import handleConnection from './handlers.ts';
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
  const connToMaster = await Deno.connect({ hostname: masterHost, port: +masterPort });
  replicaWarmUp(connToMaster, port).catch(console.error);
}

const server = Deno.listen({ hostname: '127.0.0.1', port: +port });

for await (const conn of server) {
  handleConnection(conn).catch(console.error);
}
