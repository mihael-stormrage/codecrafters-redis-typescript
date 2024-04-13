import RedisCall from './RedisCall.ts';
import replica from 'src/Replica.ts';
import { encodeBulk } from 'src/encoder.ts';
import Sections, { assertInfoSection, serialize } from './infoSections.ts';

class RedisCallInfo extends RedisCall<'info', [] | [string]> implements Sections {
  readonly name = 'info';
  length = 0 as const;

  replication = () => serialize(replica);
  // replication = () => ['# Replication', ...serialize(replica)];

  method(section: string = 'replication') {
    assertInfoSection(section);
    return encodeBulk(this.replication());
  }
}

export { RedisCallInfo };
