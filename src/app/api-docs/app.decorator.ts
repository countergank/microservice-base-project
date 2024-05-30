import { EventPatternsMS } from '../../common/enums/event-patternts-ms.enum';
import { VersionReqDTO } from '../dto/version-req.dto';
import { VersionRespDTO } from '../dto/version-resp.dto';

export function VersionReqDoc() {
  return {
    channel: EventPatternsMS.Version,
    message: {
      payload: VersionReqDTO,
    },
  };
}

export function VersionRespDoc() {
  return {
    channel: EventPatternsMS.Version,
    message: {
      payload: VersionRespDTO,
    },
  };
}
