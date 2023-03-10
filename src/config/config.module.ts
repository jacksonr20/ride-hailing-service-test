import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as CoreConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import * as Joi from 'joi';

import appConfig from './app.config';
import { Http, RateLimiting } from './interfaces';

@Module({
  imports: [
    CoreConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      envFilePath: join(__dirname, '../..', '.env'),
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'testing').default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_SSL: Joi.boolean().default(false),
        DATABASE_USERNAME: Joi.string().required(),
        MAP_BOX_BASE_URL: Joi.string().required(),
        MAP_BOX_ACCESS_TOKEN: Joi.string().required(),
        PGADMIN_DEFAULT_EMAIL: Joi.string().required(),
        PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),
        GATEWAY_BASE_URL: Joi.string().required(),
        GATEWAY_SECRET_KEY: Joi.string().required(),
        GATEWAY_PUBLIC_KEY: Joi.string().required(),
        GATEWAY_ACCEPTANCE_TOKEN: Joi.string().required(),
        TOKENIZE_CARD_NUMBER: Joi.number().required(),
        TOKENIZE_CARD_CVC: Joi.number().required(),
        TOKENIZE_CARD_EXP_MONTH: Joi.number().required(),
        TOKENIZE_CARD_EXP_YEAR: Joi.number().required(),
        TOKENIZE_CARD_HOLDER: Joi.string().required(),
      }),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (_req, _res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { timeout, maxRedirects } = configService.get<Http>('http') as Http;

        return {
          timeout,
          maxRedirects,
        };
      },
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { ttl, limit } = configService.get<RateLimiting>('rateLimiting') as RateLimiting;

        return {
          ttl,
          limit,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [ConfigModule],
})
export class ConfigModule {}
