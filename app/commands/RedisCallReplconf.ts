import RedisCall from './RedisCall.ts';
import { encodeSimple } from 'src/encoder.ts';

const connFromReplicas: Set<Deno.Conn> = new Set();

class RedisCallReplconf extends RedisCall {
  readonly minArgs = 2;
  readonly maxArgs = 4;
  toSave = false;

  saveConnToMaster(conn: Deno.Conn) {
    connFromReplicas.add(conn);
    this.toSave = false;
  }

  method(): string {
    const [modificator, _modValue, _modificator2] = this.argumentsList;
    if (!['listening-port', 'capa'].includes(modificator)) throw new Error(`Invalid call: ${this.query}`);
    if (modificator === 'listening-port') this.toSave = true;
    return encodeSimple('OK');
  }
}

export { RedisCallReplconf, connFromReplicas };
