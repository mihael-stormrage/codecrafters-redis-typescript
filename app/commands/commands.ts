import {
  RedisCallPing,
  RedisCallEcho,
  RedisCallSet,
  RedisCallGet,
  RedisCallInfo,
  RedisCallReplconf,
} from './index.ts';
import type RedisCall from './RedisCall.ts';

type ComKey = keyof typeof Commands;

const Commands = {
  ping: RedisCallPing,
  echo: RedisCallEcho,
  set: RedisCallSet,
  get: RedisCallGet,
  info: RedisCallInfo,
  replconf: RedisCallReplconf,
};

const newRedisCall = (name: ComKey, args: string[]): RedisCall => {
  return new Commands[name](name, args);
};

function isCommand(key: string): asserts key is ComKey {
  if (key in Commands) return;
  // console.error(`${key} is not a command`);
  throw new Error(`${key} is not a command`);
}

export default newRedisCall;
export { isCommand, type ComKey };
