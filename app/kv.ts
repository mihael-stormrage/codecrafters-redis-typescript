const cache: Record<string, CachedKey> = {};

class CachedKey {
  #value: string;
  expiry?: number;

  constructor(
    public readonly key: string,
    value: string,
    expiry?: number,
  ) {
    this.#value = value;
    if (expiry) this.expiry = Date.now() + expiry;
  }

  isExpired() {
    return !!this.expiry && this.expiry < Date.now();
  }

  get value(): string {
    if (this.isExpired()) {
      this[Symbol.dispose]();
      return '';
    }
    return this.#value;
  }

  set value(v: string) {
    this.#value = v;
  }

  toString = () => this.value;

  [Symbol.dispose]() {
    delete cache[this.key];
    console.log(`Key "${this.key}" disposed`);
  }
}

export { cache as default, CachedKey };
