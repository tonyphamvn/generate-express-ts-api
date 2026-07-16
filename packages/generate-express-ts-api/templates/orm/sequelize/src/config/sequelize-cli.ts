/* eslint-disable import/no-import-module-exports */
import dotenv from 'dotenv';
import { Environment } from '@/config';

dotenv.config();

function resolveDatabaseName(env: string) {
  if (env === Environment.Test) {
    return process.env.DB_TEST_NAME;
  }
  return process.env.DB_MAIN_NAME;
}

function buildEnvConfig(env: string) {
  return {
    username: process.env.DB_MAIN_USER,
    password: process.env.DB_MAIN_PASSWORD,
    database: resolveDatabaseName(env),
    host: process.env.DB_MAIN_HOST || 'localhost',
    port: parseInt(process.env.DB_MAIN_PORT || process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
  };
}

module.exports = {
  development: buildEnvConfig(Environment.Development),
  test: buildEnvConfig(Environment.Test),
  production: buildEnvConfig(Environment.Production),
};
