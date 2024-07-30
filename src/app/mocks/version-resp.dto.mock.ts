import { versionStructure } from '../../common/utils/global';
import { VersionRespDTO } from '../dto/version-resp.dto';

export class VersionRespDTOMock extends VersionRespDTO {
  constructor() {
    super({
      payload: {
        version: versionStructure('Microservice', 'local', '1.0.0'),
      },
    });
  }
}
