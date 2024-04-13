import { assertEquals } from 'std/assert/assert_equals.ts';
import { RedisCallEcho, RedisCallGet, RedisCallPing, RedisCallSet } from './index.ts';
import RedisCallQueue from 'src/RedisCallQueue.ts';
import { encodeSimple, encodeBulk } from 'src/encoder.ts';

Deno.test('instantiate RedisCall-s', () => {
  new RedisCallPing();
  new RedisCallEcho()
  new RedisCallSet();
  new RedisCallGet();
  new RedisCallQueue();
});

Deno.test('queue execution', () => {
  const q = new RedisCallQueue();
  const incomingTokens = ['ping', 'ping', 'set', 'foo', 'bar', 'echo', 'foo', 'get', 'foo', 'info'];
  const expectedResults = ['PONG', 'PONG', 'OK'].map(encodeSimple)
    .concat(['foo', 'bar', 'role:master'].map((v) => encodeBulk([v])));

  incomingTokens.forEach((key) => q.push(key));
  q.calls.forEach((call, i) => {
    assertEquals(call.exec(), expectedResults[i]);
  });
});
