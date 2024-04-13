import { assertEquals } from 'std/assert/assert_equals.ts';
import parse from './parser.ts';
import { encodeBulk } from './encoder.ts';
import { parsedKeys, payload } from './test.resources.ts';

Deno.test('parser', () => {
  const { last: redisCall } = parse(payload);
  const parsedCommand = [
    redisCall.name,
    ...redisCall.argumentsList
  ];
  assertEquals(parsedCommand, parsedKeys);
  assertEquals(redisCall.exec(), encodeBulk(['hey']));
});
