import { versionStructure } from '../../common/utils/global';
import { Version } from '../class/version.class';

export class VersionMock extends Version {
  constructor() {
    super({
      version: versionStructure('Microservice', 'local', '1.0.0'),
    });
  }
}
