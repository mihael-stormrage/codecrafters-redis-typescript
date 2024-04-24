import RedisCall from './RedisCall.ts';
import replica from 'src/Replica.ts';
import { encodeBulkMultiline } from 'src/encoder.ts';
import Sections, { assertInfoSection, serialize } from './infoSections.ts';

class RedisCallInfo extends RedisCall implements Sections {
  readonly minArgs = 0;
  readonly maxArgs = 1;

  replication = () => ['# Replication', ...serialize(replica)];

  method() {
    const [section = 'replication'] = this.argumentsList;
    assertInfoSection(section.toLowerCase());
    return encodeBulkMultiline(this.replication());
  }
}

export { RedisCallInfo };
