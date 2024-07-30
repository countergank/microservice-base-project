import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { EventPatternsMS } from '../../common/enums/event-patternts-ms.enum';
import { CustomLogger } from '../../common/logger';
import { VersionDoc } from '../api-docs/app.decorator';
import { VersionReqDTO } from '../dto/version-req.dto';
import { VersionRespDTO } from '../dto/version-resp.dto';
import { AppVersionNotFoundError } from '../errors/app-version-not-found.error';
import { AppService } from '../service/app.service';

@Controller()
export class AppController {
  private readonly logger = new CustomLogger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @VersionDoc()
  @MessagePattern(EventPatternsMS.Version)
  async getVersion(versionReqDTO: VersionReqDTO): Promise<VersionRespDTO> {
    try {
      this.logger.log(`${this.getVersion.name}: ${VersionReqDTO.name} = ${JSON.stringify(versionReqDTO, null, 2)}`);
      const version = await this.appService.getVersion();
      return new VersionRespDTO({ payload: version });
    } catch (error) {
      if (error instanceof AppVersionNotFoundError) {
        throw new RpcException(error.fullMessage);
      }
      this.logger.error(error.message, error.stack);
      throw new RpcException(error);
    }
  }
}
