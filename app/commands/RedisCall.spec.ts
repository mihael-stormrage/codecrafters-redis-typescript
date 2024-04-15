import { assertEquals } from 'std/assert/assert_equals.ts';
import RedisCallQueue from 'src/RedisCallQueue.ts';
import { encodeSimple, encodeBulk } from 'src/encoder.ts';

Deno.test('queue execution', () => {
  const q = new RedisCallQueue();
  const incomingTokens = [
    ['ping'],
    ['set', 'foo', 'bar'],
    ['echo', 'foo'],
    ['get', 'foo'],
    ['info']
  ];
  const expectedResults = ['PONG', 'OK'].map(encodeSimple)
    .concat(['foo', 'bar', 'role:master'].map((v) => encodeBulk([v])));

  incomingTokens.forEach((command) => q.push(command));
  q.calls.forEach((call, i) => {
    assertEquals(call.exec(), expectedResults[i]);
  });
});
