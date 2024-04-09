import { assertEquals } from 'https://deno.land/std@0.221.0/assert/mod.ts';
import decode from './decoder.ts';

export const payload = '*2\r\n$4\r\necho\r\n$3\r\nhey\r\n';
export const parsedKeys = ['echo', 'hey'];

Deno.test('parser', () => {
  assertEquals(decode(payload), parsedKeys);
});
