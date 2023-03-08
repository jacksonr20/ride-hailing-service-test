import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import compression from '@fastify/compress';
import helmet from '@fastify/helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // Allow resources to be requested from another domain.
  app.enableCors();

  /**
   * Instead of stripping non-whitelisted properties validator will throw an error
   * Strip validated (returned) object of any properties that do not use any validation decorators.
   * Automatically transform payloads to be objects typed according to their DTO classes.
   * **/
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  // Enabling pino-logger
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // Tells fastify-compress to only use gzip and deflate encodings, preferring gzip if the client supports both.
  await app.register(compression, { encodings: ['gzip', 'deflate'] });

  // Setting up Swagger
  const config = new DocumentBuilder()
    .setTitle(process.env?.APP_NAME ?? 'Swagger')
    .setDescription('Small ride-hailing service for monetary transactions')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Initialize helmet to protect the app from some well-known web vulnerabilities
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  // The 0.0.0.0 is set to accept connections on other hosts
  await app.listen(process.env?.APP_PORT ?? 3000, '0.0.0.0');
}
bootstrap();
