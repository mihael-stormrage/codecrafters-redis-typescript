import { assertEquals } from 'std/assert/assert_equals.ts';
import decode from './decoder.ts';
import { parsedKeys, payload } from './test.resources.ts';

Deno.test('decoder', () => {
  assertEquals(decode(payload), parsedKeys);
});
