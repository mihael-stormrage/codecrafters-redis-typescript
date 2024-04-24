import { createServer } from 'node:net';
import { parseArgs } from 'std/cli/parse_args.ts';
import { isDefined, isReplconf } from './util.ts';
import parse from './parser.ts';
import replicaWarmUp from './replication.ts';
import { connFromReplicas } from './commands/index.ts';
import replica from './Replica.ts';

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
      // FIXME(?): Queue is recreated every call
      queue.calls
        .map((call) => {
          const res = call.exec();
          if (isReplconf(call) && call.toSave) call.saveConnToMaster(connection);
          if (call.isWrite && replica.role === 'master') connFromReplicas
            // FIXME(?): Only works while data chunk is one call long
            .forEach((replica) => replica.write(data));
          return res;
        })
        .filter(isDefined)
        .forEach((v) => connection.write(v));
    } catch (error) {
      console.error(error);
    }
  });
});

server.listen(+port, '127.0.0.1');
