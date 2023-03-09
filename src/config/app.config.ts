import { AppConfig } from './interfaces';

export default (): AppConfig => ({
  port: Number(process.env?.PORT ?? 3000),
  database: {
    database: String(process.env.DATABASE_NAME),
    host: String(process.env.DATABASE_HOST),
    password: String(process.env.DATABASE_PASSWORD),
    port: Number(process.env?.DATABASE_PORT ?? 5432),
    ssl: process.env.DATABASE_SSL === 'true',
    username: String(process.env.DATABASE_USERNAME),
  },
  rateLimiting: {
    ttl: Number(process.env?.THROTTLER_TTL ?? 60),
    limit: Number(process.env?.THROTTLER_LIMIT ?? 10),
  },
  http: {
    timeout: Number(process.env?.HTTP_TIMEOUT ?? 5000),
    maxRedirects: Number(process.env?.HTTP_MAX_REDIRECTS ?? 5),
  },
  tokenizeCard: {
    number: Number(process.env?.TOKENIZE_CARD_NUMBER),
    cvc: Number(process.env?.TOKENIZE_CARD_CVC),
    expMonth: Number(process.env?.TOKENIZE_CARD_EXP_MONTH),
    expYear: Number(process.env?.TOKENIZE_CARD_EXP_YEAR),
    cardHolder: String(process.env?.TOKENIZE_CARD_HOLDER),
  },
});
