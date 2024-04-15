import decode from './decoder.ts';
import RedisCallQueue from './RedisCallQueue.ts';

const parse = (data: string) => {
  const commands = decode(data);
  const queue = new RedisCallQueue();
  commands.forEach((com) => queue.push(com));
  return queue;
};

export default parse;
