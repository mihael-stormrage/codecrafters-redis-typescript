import type RedisCall from './commands/RedisCall.ts';
import { RedisCallReplconf } from './commands/index.ts';

const isDefined = <T>(v: T | void | undefined): v is T => v !== undefined;
const isReplconf = (call: RedisCall): call is RedisCallReplconf => call.name === 'replconf';

export { isDefined, isReplconf };
