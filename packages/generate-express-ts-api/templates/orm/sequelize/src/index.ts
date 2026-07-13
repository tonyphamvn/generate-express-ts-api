import express from 'express';
import cookieParser from 'cookie-parser';
import App from '@/app';

const app = new App({
  port: parseInt(process.env.PORT || '4000', 10),
  middleWares: [
    express.json(),
    cookieParser(),
    express.urlencoded({ extended: true, limit: '5m' }),
  ],
});

app.listen();
