import http from 'http';
import express, { Application } from 'express';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import RequestLogger, { logger } from '@/shared/logger';
import { Environment } from '@config';
import indexRouter from '@/bootstrap/routes';
import { errorHandler } from '@/shared/middlewares/error-handler';
import requestValidation from '@/shared/request-validation';
import { configurePassport } from '@/infrastructure/auth/passport';
import { initSocket } from '@/infrastructure/socket';

class App {
  private app: Application;
  public port: number;
  public apiPrefix = '/api/v1';

  constructor(appInit: { port: number; middlewares: any[] }) {
    this.app = express();
    this.port = appInit.port;
    this.assets();
    this.middlewares(appInit.middlewares);
    this.initPassport();
    this.initRoutes();
    this.handleError();
  }

  private assets() {
    if (process.env.NODE_ENV === Environment.Production) {
      this.app.use(compress());
      this.app.use(helmet());
    } else {
      this.app.use(cors());
    }
  }

  private middlewares(mws: any[]) {
    mws.forEach((mw) => {
      this.app.use(mw);
    });
  }

  private initPassport() {
    configurePassport(passport);
    this.app.use(passport.initialize());
  }

  private initRoutes() {
    this.app.use(this.apiPrefix, indexRouter);
  }

  private handleError() {
    if (process.env.NODE_ENV === Environment.Development) {
      this.app.use(RequestLogger());
    }
    this.app.use(requestValidation);
    this.app.use(errorHandler);
  }

  public async listen() {
    const server = http.createServer(this.app);

    await initSocket(server);

    await new Promise<void>((resolve) => {
      server.listen(this.port, () => {
        if (process.env.NODE_ENV !== Environment.Production) {
          logger.info(`Server is listening at port ${this.port}`);
        }
        resolve();
      });
    });
  }
}

export default App;
