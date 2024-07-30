import { HttpStatus } from '@nestjs/common';
import { applyDocsDecorators } from '../../common/api-docs/defaults.decorator';
import { EventPatternsMS } from '../../common/enums/event-patternts-ms.enum';
import { VersionReqDTO } from '../dto/version-req.dto';
import { VersionRespDTO } from '../dto/version-resp.dto';
import { VersionRespDTOMock } from '../mocks/version-resp.dto.mock';

export function VersionDoc() {
  return applyDocsDecorators(
    { name: EventPatternsMS.Version, description: 'API Version' },
    { status: HttpStatus.OK, model: VersionReqDTO },
    {
      body: {
        model: VersionRespDTO,
        mock: VersionRespDTOMock,
      },
    },
  );
}
