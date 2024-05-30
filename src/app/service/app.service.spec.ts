import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppVersionNotFoundError } from '../errors/app-version-not-found.error';
import { AppService } from './app.service';

describe(AppService.name, () => {
  let service: AppService;
  let configService: ConfigService;

  let name = String(process.env.npm_package_name);
  let version = String(process.env.npm_package_version);
  let env = String(process.env.NODE_ENV);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService, ConfigService],
    }).compile();

    service = module.get<AppService>(AppService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`${AppService.name} should be defined`, () => {
    expect(service).toBeDefined();
  });

  describe(`${AppService.name}.${AppService.prototype.getVersion.name}`, () => {
    it('should return API version', async () => {
      jest.spyOn(configService, 'getOrThrow').mockImplementation(() => name);
      jest.spyOn(configService, 'getOrThrow').mockImplementation(() => version);
      jest.spyOn(configService, 'getOrThrow').mockImplementation(() => env);
      await expect(service.getVersion()).not.toBeUndefined();
    });

    it(`should return ${AppVersionNotFoundError.name}`, async () => {
      name = undefined;
      version = undefined;
      env = undefined;
      jest.spyOn(configService, 'getOrThrow').mockImplementation(() => name);
      jest.spyOn(configService, 'getOrThrow').mockImplementation(() => version);
      jest.spyOn(configService, 'getOrThrow').mockImplementation(() => env);
      await expect(service.getVersion()).rejects.toThrow(AppVersionNotFoundError);
    });
  });
});
