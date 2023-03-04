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
});
