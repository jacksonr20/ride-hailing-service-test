import { Module } from '@nestjs/common';
import { ConfigModule as CoreConfigModule } from '@nestjs/config';
import { join } from 'path';
import * as Joi from 'joi';

import appConfig from './app.config';

@Module({
  imports: [
    CoreConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      envFilePath: join(__dirname, '../..', `.env.${process.env?.NODE_ENV ?? 'production'}`),
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'testing').default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_SSL: Joi.boolean().default(false),
        DATABASE_USERNAME: Joi.string().required(),
      }),
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigModule {}
