import { DatabaseConfig, RateLimiting, Http } from './';

export interface AppConfig {
  port: number;
  database: DatabaseConfig;
  rateLimiting: RateLimiting;
  http: Http;
}
