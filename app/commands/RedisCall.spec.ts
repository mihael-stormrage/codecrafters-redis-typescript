import { RedisCallEcho, RedisCallGet, RedisCallPing, RedisCallSet } from './index.ts';
import RedisCallQueue from 'src/RedisCallQueue.ts';

const call = new RedisCallPing();
new RedisCallEcho()
new RedisCallSet();
new RedisCallGet();
const q = new RedisCallQueue();

q.push('ping');
q.push('ping');
q.push('echo');
q.push('foo');
q.push('set');
q.push('foo');
