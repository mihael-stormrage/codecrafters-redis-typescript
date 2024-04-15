import RedisCall from './RedisCall.ts';
import replica from 'src/Replica.ts';
import { encodeBulk } from 'src/encoder.ts';
import Sections, { assertInfoSection, serialize } from './infoSections.ts';

class RedisCallInfo extends RedisCall implements Sections {
  readonly minArgs = 0;
  readonly maxArgs = 1;

  // replication = () => ['# Replication', ...serialize(replica)];
  replication = () => serialize(replica);

  method() {
    const [section = 'replication'] = this.argumentsList;
    assertInfoSection(section);
    return encodeBulk(this.replication());
  }
}

export { RedisCallInfo };
