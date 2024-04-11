import { createServer } from 'node:net';
import parse from './parser.ts';

const defaultPort = 6379;

const parseCliArgs = () => {
  const args = Deno.args;
  const portIndex = args.indexOf('--port') + 1;
  const port = Number(args[portIndex] ?? defaultPort);
  return { port };
};

const { port } = parseCliArgs();

const server = createServer((connection) => {
  connection.on('data', (data) => {
    const queue = parse(data.toString());
    queue.calls.forEach((call) => {
      connection.write(call.exec());
    });
  });
});

server.listen(port, '127.0.0.1');
