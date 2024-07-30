import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const host = configService.get('HOST') || '0.0.0.0';
  const port = configService.get('PORT') || '5000';
  const docsPort = configService.get('DOCS_PORT') || '5001';
  const version = configService.get('npm_package_version') || '1.0.0';
  const name = configService.get('npm_package_name') || 'Microservice';
  const description = configService.get('npm_package_description') || 'Microservice description';
  const protocol = 'TCP';
  const transport = Transport[protocol];

  app.connectMicroservice<MicroserviceOptions>({
    transport: transport,
    options: {
      host: host,
      port: port,
    },
  });

  const config = new DocumentBuilder().setTitle(name).setDescription(description).setVersion(version).build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.startAllMicroservices();
  await app.listen(docsPort, host);
}
bootstrap();
