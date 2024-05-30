import { versionStructure } from '../../common/utils/global';
import { VersionReqDTO } from '../dto/version-req.dto';

export class VersionReqDTOMock extends VersionReqDTO {
  constructor() {
    super({
      payload: {
        version: versionStructure('Microservice', 'local', '1.0.0'),
      },
    });

    return this;
  }
}
