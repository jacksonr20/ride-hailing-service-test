import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

const configService = new ConfigService();

export const CONNECTION_OPTIONS: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [join(__dirname, '../entities', '*.entity.{js,ts}'), join(__dirname, '../..', 'api/**/entities/**', '*.entity.{js,ts}')],
  migrations: [join(__dirname, '../migrations', '*.{js,ts}')],
  synchronize: false,
};

export default new DataSource(CONNECTION_OPTIONS as DataSourceOptions);
