import * as net from "node:net";
import parse, { Commands } from "./parser.ts";

const execCom = (command: Commands, arg: string) => {
  switch (command.toUpperCase()) {
    case Commands.PING:
      return 'PONG';
    case Commands.ECHO:
      return arg;
  }
};

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.on('data', (data) => {
    const commands = parse(data.toString());
    commands.forEach((com) => {
      connection.write(`+${execCom(...com)}\r\n`);
    });
  });
});

server.listen(6379, "127.0.0.1");
