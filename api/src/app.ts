import express, { Application, Request, Response, NextFunction } from 'express';
import { ErrorHandler } from 'express-handler-errors';
import 'express-async-errors';
import routes from './routes';

class App {
  public readonly express: Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.errorHandler();
  }

  private errorHandler(): void {
    this.express.use(
      (err: Error, _: Request, res: Response, next: NextFunction) => {
        new ErrorHandler().handle(err, res, next);
      }
    );
  }

  private middleware(): void {
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
