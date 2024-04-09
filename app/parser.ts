import decode from './decoder.ts';
import RedisCallQueue from './RedisCallQueue.ts';

const parse = (data: string) => {
  const keys = decode(data);
  const queue = new RedisCallQueue();
  keys.forEach((k) => queue.push(k));
  return queue;
};

export default parse;
