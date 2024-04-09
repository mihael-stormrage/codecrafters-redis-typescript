import parse from './parser.ts';

export const cache: Record<string, string> = {};

Deno.serve({ port: 6379 }, async (req) => {
  parse(await req.text());
  return new Response();
});
