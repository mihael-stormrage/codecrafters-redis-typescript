import { assertEquals } from 'std/assert/assert_equals.ts';
import { encodeBulk } from './encoder.ts';
import { parsedKeys, payload } from './test.resources.ts';

Deno.test('encoder: bulk string', () => {
  assertEquals(encodeBulk(parsedKeys), payload);
});
