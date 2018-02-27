import { Application } from 'express';
import { AppServer } from '../app-server';
import { CategoryRoute } from './category.route';
import { BookRoute } from './book.route';

export class Routes {
  private app: Application;

  public static create(): Routes {
    return new Routes();
  }

  public init(server: AppServer) {
    this.app = server.app;
    this.app.use('/api/category/', CategoryRoute.create().init(server));
    this.app.use('/api/book/', BookRoute.create().init(server));
  }
}
