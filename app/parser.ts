import decode from './decoder.ts';
import RedisCallQueue from './RedisCallQueue.ts';

const parse = (data: Uint8Array) => {
  const str = new TextDecoder().decode(data);
  const commands = decode(str);
  const queue = new RedisCallQueue();
  commands.forEach((com) => queue.push(com));
  return queue;
};

export default parse;
