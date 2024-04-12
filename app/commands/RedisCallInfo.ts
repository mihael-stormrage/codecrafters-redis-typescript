import { stringify } from 'std/yaml/stringify.ts';
import RedisCall from './RedisCall.ts';
import { replica } from 'src/main.ts';
import { encodeBulk } from 'src/encoder.ts';

abstract class Sections {
  abstract replications(): string[];
}

class RedisCallInfo extends RedisCall<'info', [] | [string]> implements Sections {
  readonly name = 'info';
  length = 0 as const;

  replications(): string[] {
    const data = stringify(replica, { condenseFlow: true });
    console.log(data);
    return ['# Replication', data];
  }

  method(section: string = 'replications') {
    return encodeBulk(this.replications());
  }
}

function isInfoSection(key: string): asserts key is keyof Sections {
  if (!(key in Sections.prototype)) throw new Error(`Wrong parameter: ${key}`);
}

export { RedisCallInfo, isInfoSection };
