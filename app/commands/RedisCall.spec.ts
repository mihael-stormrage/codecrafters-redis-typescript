import { assertEquals } from 'std/assert/assert_equals.ts';
import RedisCallQueue from 'src/RedisCallQueue.ts';
import { encodeSimple, encodeBulk, encodeArray } from 'src/encoder.ts';

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
    .concat(['foo', 'bar', [
      'role:master',
      'master_replid:8371b4fb1155b71f4a04d3e1bc3e18c4a990aeeb',
      'master_repl_offset:0',
    ]].map((v) => Array.isArray(v) ? encodeArray(v) : encodeBulk(v)));

  incomingTokens.forEach((command) => q.push(command));
  q.calls.forEach((call, i) => {
    assertEquals(call.exec(), expectedResults[i]);
  });
});
