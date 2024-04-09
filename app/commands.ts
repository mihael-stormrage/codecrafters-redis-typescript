import { encodeBulk, encodeSimple } from './encoder.ts';
import { cache } from './main.ts';

type ComKey = keyof typeof Commands;
type Command<C extends ComKey> = typeof Commands[C];

const Commands = {
  ping: () => encodeSimple('PONG'),
  echo: (msg: string) => encodeBulk([msg]),
  set: (k: string, v: string) => {
    cache[k] = v;
    return encodeSimple('OK');
  },
  get: (k: string) => {
    const { [k]: v } = cache;
    return encodeBulk([v]);
  },
};

function isCommand(key: string): asserts key is ComKey {
  if (key !in Commands) throw new Error(`${key} is not a command`);
}

export { Commands as default, type Command, type ComKey, isCommand };
