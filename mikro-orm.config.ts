import { defineConfig } from '@mikro-orm/postgresql';
import dotenv from 'dotenv';
import { User } from './src/infrastructure/database/entities/User';

dotenv.config();

const isSqlite = process.env.DB_STORAGE != null && process.env.DB_MAIN_HOST == null;

export default defineConfig({
  entities: [User],
  dbName: isSqlite
    ? process.env.DB_STORAGE || './database/dev.sqlite'
    : process.env.DB_MAIN_NAME || 'db_main',
  host: isSqlite ? undefined : process.env.DB_MAIN_HOST || 'localhost',
  port: isSqlite
    ? undefined
    : parseInt(process.env.DB_MAIN_PORT || process.env.DB_PORT || '5432', 10),
  user: isSqlite ? undefined : process.env.DB_MAIN_USER || 'postgres',
  password: isSqlite ? undefined : process.env.DB_MAIN_PASSWORD || 'postgres',
  debug: process.env.NODE_ENV === 'development',
  migrations: {
    path: './src/infrastructure/database/migrations',
    pathTs: './src/infrastructure/database/migrations',
  },
});
