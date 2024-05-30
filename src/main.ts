import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';
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

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .setDefaultContentType('application/json')
    .addServer(name, {
      url: `http://${host}:${docsPort}`,
      protocol: protocol,
    })
    .build();

  const asyncapiDocument = await AsyncApiModule.createDocument(app, asyncApiOptions);
  await AsyncApiModule.setup('/docs', app, asyncapiDocument);

  await app.startAllMicroservices();
  await app.listen(docsPort, host);
}
bootstrap();
