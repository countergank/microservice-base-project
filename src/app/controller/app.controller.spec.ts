import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { VersionRespDTO } from '../dto/version-resp.dto';
import { AppVersionNotFoundError } from '../errors/app-version-not-found.error';
import { VersionReqDTOMock } from '../mocks/version-req.dto.mock';
import { VersionMock } from '../mocks/version.mock';
import { AppService } from '../service/app.service';
import { AppController } from './app.controller';

describe(AppController.name, () => {
  let controller: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ConfigService],
    }).compile();

    controller = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it(`${AppController.name} should be defined`, () => {
    expect(controller).toBeDefined();
  });

  describe(`${AppController.name}.${AppController.prototype.getVersion.name}`, () => {
    const versionReqDTOMock = new VersionReqDTOMock();

    it('should return API version', async () => {
      jest.spyOn(appService, 'getVersion').mockResolvedValue(new VersionMock());
      await expect(controller.getVersion(versionReqDTOMock)).resolves.toBeInstanceOf(VersionRespDTO);
    });

    it(`should return ${AppVersionNotFoundError.name}`, async () => {
      jest.spyOn(appService, 'getVersion').mockRejectedValueOnce(new AppVersionNotFoundError());
      await expect(controller.getVersion(versionReqDTOMock)).rejects.toThrow(RpcException);
    });

    it(`should return ${RpcException.name}`, async () => {
      jest.spyOn(appService, 'getVersion').mockRejectedValueOnce(new RpcException(''));
      await expect(controller.getVersion(versionReqDTOMock)).rejects.toThrow(RpcException);
    });
  });
});
