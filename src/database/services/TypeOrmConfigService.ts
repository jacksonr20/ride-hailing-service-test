import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { DatabaseConfig } from 'src/config/interfaces';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private databaseConfig: DatabaseConfig;

  constructor(private configService: ConfigService) {
    this.databaseConfig = this.configService.get<DatabaseConfig>('database') as DatabaseConfig;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { host, port, username, password, database } = this.databaseConfig;

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
    };
  }
}
