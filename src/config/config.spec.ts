import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModuleOption } from './config-module-option';

describe(ConfigModuleOption.name, () => {
  let configOptions: ConfigModuleOption;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigModuleOption],
    }).compile();

    configOptions = module.get<ConfigModuleOption>(ConfigModuleOption);
  });

  describe(ConfigModuleOption.name, () => {
    it('should be defined', () => {
      expect(configOptions).toBeDefined();
    });
  });
});
