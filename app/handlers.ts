import parse from './parser.ts';
import replica from './Replica.ts';
import { connFromReplicas } from './commands/index.ts';
import { isDefined, isReplconf } from './util.ts';

const handleConnection = async (conn: Deno.Conn) => {
  for await (const data of conn.readable) {
    try {
      const queue = parse(data);
      // FIXME(?): Queue is recreated every call
      queue.calls
        .map((call) => {
          const res = call.exec();
          if (isReplconf(call) && call.toSave) call.saveConnToMaster(conn);
          if (call.isWrite && replica.role === 'master') connFromReplicas
            // FIXME(?): Only works while data chunk is one call long
            .forEach((replica) => replica.write(data));
          return res;
        })
        .filter(isDefined)
        .forEach((v) => conn.write(v));
    } catch (error) {
      console.error(error);
    }
  }
};

export default handleConnection;
