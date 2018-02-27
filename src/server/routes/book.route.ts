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

    return this.router
      .get('/', (req: Request, res: Response) => {
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
      })
      .get('/:id', (req: Request, res: Response) => {
        this.server.model.book
          .findById(req.params.id)
          .populate('category')
          .exec((err: Error, book: Book) => {
            if (err) {
              return res.status(500).send({ message: err.message });
            }
            res.send(book);
          });
      })
      .post('/new', (req: Request, res: Response) => {
        this.server.model.book.create(
          {
            name: req.body.name,
            author: req.body.author,
            category: req.body.category,
            publishedData: req.body.publishedDate,
            user: req.body.user
          },
          (err: Error, books: Book[]) => {
            if (err) {
              return res.status(500).send({ message: err.message });
            }
            res.send(books[0]);
          }
        );
      });
  }
}
