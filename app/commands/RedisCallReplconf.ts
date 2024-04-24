import RedisCall from './RedisCall.ts';
import { encodeSimple, encodeArray } from 'src/encoder.ts';

const connFromReplicas: Set<Deno.Conn> = new Set();

class RedisCallReplconf extends RedisCall {
  readonly minArgs = 2;
  readonly maxArgs = 4;
  toSave = false;

  saveConnToMaster(conn: Deno.Conn) {
    connFromReplicas.add(conn);
    this.toSave = false;
  }

  #ack = () => encodeArray(['REPLCONF', 'ACK', '0']);

  method(): string {
    this.argumentsList = this.argumentsList.map((v) => v?.toLowerCase());
    const [modificator, _modValue, _modificator2] = this.argumentsList;
    if (!['listening-port', 'capa', 'getack'].includes(modificator)) throw new Error(`Invalid call: ${this.query}`);
    if (modificator === 'listening-port') this.toSave = true;
    if (modificator === 'getack') return this.#ack();
    return encodeSimple('OK');
  }
}

export { RedisCallReplconf, connFromReplicas };
