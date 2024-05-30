import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { versionStructure } from '../../common/utils/global';
import { Version } from '../class/version.class';
import { AppVersionNotFoundError } from '../errors/app-version-not-found.error';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  async getVersion(): Promise<Version> {
    const packageName = this.configService.getOrThrow('npm_package_name');
    const env = this.configService.getOrThrow('NODE_ENV');
    const version = this.configService.getOrThrow('npm_package_version');

    if (!packageName || !env || !version) {
      throw new AppVersionNotFoundError();
    }
    return {
      version: versionStructure(packageName, env, version),
    };
  }
}
