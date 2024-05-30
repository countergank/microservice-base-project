import { plainToInstance } from 'class-transformer';
import { IsEnum, IsOptional, IsString, validateSync } from 'class-validator';
import { Environment } from '../common/constants';

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsOptional()
  @IsString()
  HOST: string;

  @IsOptional()
  @IsString()
  PORT: string;

  @IsOptional()
  @IsString()
  DOCS_PORT: string;

  @IsString()
  @IsOptional()
  DEBUG: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
