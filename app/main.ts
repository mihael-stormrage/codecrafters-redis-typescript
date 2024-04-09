import { createServer } from 'node:net';
import parse from './parser.ts';

const server = createServer((connection) => {
  connection.on('data', (data) => {
    const queue = parse(data.toString());
    queue.calls.forEach((call) => {
      connection.write(call.exec());
    });
  });
});

server.listen(6379, '127.0.0.1');
