import { DatabaseConfig, RateLimiting, Http } from './';
import { TokenizeCard } from './../../api/libs/interfaces';

export interface AppConfig {
  port: number;
  database: DatabaseConfig;
  rateLimiting: RateLimiting;
  http: Http;
  tokenizeCard: TokenizeCard;
}
