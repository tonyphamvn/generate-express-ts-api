import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import App from '@/bootstrap/app';
import { initializeDatabase } from '@/infrastructure/database/mikro-orm';

export async function bootstrap() {
  await initializeDatabase();

  const app = new App({
    port: parseInt(process.env.PORT || '4000', 10),
    middlewares: [
      express.json(),
      cookieParser(),
      express.urlencoded({ extended: true, limit: '5m' }),
    ],
  });

  await app.listen();
}
