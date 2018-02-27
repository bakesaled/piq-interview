import { Router, Request, Response } from 'express';
import { AppServer } from '../app-server';
import { Book } from '../interfaces/book';

export class BookRoute {
  private router: Router;
  private server: AppServer;

  public static create(): BookRoute {
    return new BookRoute();
  }

  constructor() {
    this.router = Router();
  }

  public init(server: AppServer) {
    this.server = server;

    return this.router.get('/', (req: Request, res: Response) => {
      // Return all books
      this.server.model.book
        .find({}, '')
        .populate('category')
        .exec((err: Error, books) => {
          const booksResult: Array<Book> = [];
          if (err) {
            return res.status(500).send({ message: err.message });
          }
          if (books) {
            books.forEach(book => {
              booksResult.push(book);
            });
          }
          res.send(booksResult);
        });
    });
  }
}
