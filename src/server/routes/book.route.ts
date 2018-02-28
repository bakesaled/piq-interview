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
      .get(
        '/search/:page/:pageSize/:filter?',
        (req: Request, res: Response) => {
          const pageSize = parseInt(req.params.pageSize, 10);
          const page = parseInt(req.params.page, 10) + 1;
          let or = [{}];
          if (req.params.filter) {
            const filter = { $regex: req.params.filter, $options: 'i' };
            or = [{ name: filter }, { author: filter }, { user: filter }];
          }

          this.server.model.book
            .find({})
            .or(or)
            .skip(pageSize * page - pageSize)
            .limit(pageSize)
            .populate('category')
            .exec((err: Error, books) => {
              if (err) {
                return res.status(500).send({ message: err.message });
              }
              this.server.model.book
                .count({})
                .exec((error: Error, count: number) => {
                  const booksResult: Array<Book> = [];
                  if (err) {
                    return res.status(500).send({ message: err.message });
                  }
                  if (books) {
                    books.forEach(book => {
                      booksResult.push(book);
                    });
                  }
                  res.send({
                    books: booksResult,
                    current: page,
                    pages: Math.ceil(count / pageSize),
                    count: count
                  });
                });
            });
        }
      )
      .get('/single/:id', (req: Request, res: Response) => {
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
            publishedDate: req.body.publishedDate,
            user: req.body.user
          },
          (err: Error, book: Book) => {
            if (err) {
              return res.status(500).send({ message: err.message });
            }
            res.send(book);
          }
        );
      })
      .put('/update', (req: Request, res: Response) => {
        console.log('update', req.body);
        this.server.model.book.update(
          { _id: req.body._id },
          {
            name: req.body.name,
            author: req.body.author,
            category: req.body.category,
            publishedDate: req.body.publishedDate,
            user: req.body.user
          },
          { multi: false },
          (err: Error, book: Book) => {
            if (err) {
              return res.status(500).send({ message: err.message });
            }
            res.send(book);
          }
        );
      })
      .delete('/delete/:id', (req: Request, res: Response) => {
        this.server.model.book.findOneAndRemove(
          { _id: req.params.id },
          (err: Error) => {
            if (err) {
              return res.status(500).send({ message: err.message });
            }
            return res.status(200).send(true);
          }
        );
      });
  }
}
