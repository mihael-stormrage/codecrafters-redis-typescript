import { assertEquals } from 'https://deno.land/std@0.221.0/assert/mod.ts';
import { encodeBulk } from './encoder.ts';
import { parsedKeys, payload } from './decoder.spec.ts';

Deno.test('encoder: bulk string', () => {
  assertEquals(encodeBulk(parsedKeys), payload);
});
