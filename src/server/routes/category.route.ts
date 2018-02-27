import { Router, Request, Response } from 'express';
import { AppServer } from '../app-server';
import { Category } from '../interfaces/category';

export class CategoryRoute {
  private router: Router;
  private server: AppServer;

  public static create(): CategoryRoute {
    return new CategoryRoute();
  }

  constructor() {
    this.router = Router();
  }

  public init(server: AppServer) {
    this.server = server;

    return this.router.get('/', (req: Request, res: Response) => {
      // Return all categories
      this.server.model.category.find({}, '', (err: Error, categories) => {
        const categoriesResult: Array<Category> = [];
        if (err) {
          return res.status(500).send({message: err.message});
        }
        if (categories) {
          categories.forEach(cat => {
            categoriesResult.push(cat);
          });
        }
        res.send(categoriesResult);
      });
    });
  }
}
