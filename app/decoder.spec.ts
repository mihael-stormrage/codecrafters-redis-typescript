import { assertEquals } from 'std/assert/assert_equals.ts';
import decode, { _cutRdb } from './decoder.ts';
import { parsedKeys, payload } from './test.resources.ts';
import { emptyRdb } from './Replica.ts';

Deno.test('decoder', () => {
  assertEquals(decode(payload), [parsedKeys]);
});

Deno.test('decoder: RDB chunk', () => {
  const rdbText = new TextDecoder().decode(emptyRdb);
  const cases = [rdbText, rdbText + '*3'].map(_cutRdb);
  assertEquals(cases, ['', '*3']);
});
