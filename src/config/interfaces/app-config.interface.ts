import { DatabaseConfig } from './database-config.interface';

export interface AppConfig {
  port: number;
  database: DatabaseConfig;
}
