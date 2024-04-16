import { assertEquals } from 'std/assert/assert_equals.ts';
import { encodeArray } from './encoder.ts';
import { parsedKeys, payload } from './test.resources.ts';

Deno.test('encoder: Array', () => {
  assertEquals(encodeArray(parsedKeys), payload);
});
