import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Message } from '../../common/class/message.class';
import { Version } from '../class/version.class';
import { VersionMock } from '../mocks/version.mock';

export class VersionRespDTO extends Message<Version> {
  @ApiProperty({
    oneOf: [{ $ref: getSchemaPath(Version) }],
    examples: [new VersionMock()],
  })
  timestamp = new Date();
  payload: Version;
}
