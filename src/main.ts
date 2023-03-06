import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import compression from '@fastify/compress';
import helmet from '@fastify/helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  /**
   * Strip validated (returned) object of any properties that do not use any validation decorators.
   * Automatically transform payloads to be objects typed according to their DTO classes.
   * **/
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Enabling pino-logger
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // Tells fastify-compress to only use gzip and deflate encodings, preferring gzip if the client supports both.
  await app.register(compression, { encodings: ['gzip', 'deflate'] });

  // Initialize helmet to protect the app from some well-known web vulnerabilities
  await app.register(helmet);

  // The 0.0.0.0 is set to accept connections on other hosts
  await app.listen(process.env?.APP_PORT ?? 3000, '0.0.0.0');
}
bootstrap();
