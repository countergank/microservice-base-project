import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOption } from '../config/config-module-option';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';

@Module({
  imports: [ConfigModule.forRoot(new ConfigModuleOption())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
