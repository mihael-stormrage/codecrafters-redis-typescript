const serialize = <T, K extends keyof T>(obj: Record<K, T[K]>) => Object.entries(obj)
  .map(([k, v]) => `${k}:${v}`);

type Section = typeof sections[number];

type Sections = {
  [K in Section]: () => string[];
}

const sections = ['replication'] as const;

function assertInfoSection(key: string): asserts key is Section {
  if (!sections.includes(key as any)) throw new Error(`Wrong parameter: ${key}`);
}

const isInfoSection = (key: string): key is Section => (sections as unknown as string[]).includes(key);

export { type Sections as default, isInfoSection, assertInfoSection, serialize };
