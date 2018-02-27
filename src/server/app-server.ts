import { Application } from 'express';
import * as express from 'express';
import bodyParser = require('body-parser');
import { DefaultConfig } from './config/default';
import * as mongoose from 'mongoose';
import Q = require('q');
import { AppModel } from './models/app.model';
import { BookModel } from './models/book.model';
import { bookSchema } from './schemas/book.schema';
import { categorySchema } from './schemas/category.schema';
import { CategoryModel } from './models/category.model';
import { categorySeed } from './seed/category.seed';
import { Routes } from './routes';

export class AppServer {
  public app: Application;
  public model: AppModel;

  constructor() {
    this.model = Object();
    this.app = express();
    this.initRoot();
  }

  public static bootstrap(): AppServer {
    return new AppServer();
  }

  public init() {
    this.initDb();

    console.log('listening on port', DefaultConfig.port);
    this.app.listen(DefaultConfig.port);
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  private initRoot() {
    this.app.get('/', function(req, res) {
      res.sendStatus(200);
    });
  }

  private initDb() {
    global.Promise = Q.Promise;
    (<any>mongoose).Promise = global.Promise;
    const connection: mongoose.Connection = mongoose.createConnection(
      DefaultConfig.database,
      DefaultConfig.dbOptions
    );

    console.log(
      `connected to '${connection['name']}' on '${connection['host']}'`
    );

    this.model.book = connection.model<BookModel>('Book', bookSchema);
    this.model.category = connection.model<CategoryModel>(
      'Category',
      categorySchema
    );

    this.populateCategories();

    Routes.create().init(this);
  }

  private populateCategories() {
    console.log('seeding categories');
    for (let i = 0; i < categorySeed.length; i++) {
      const category: CategoryModel = categorySeed[i] as CategoryModel;
      this.model.category.findOne({ name: category.name }, (err, res) => {
        this.handleMongooseError(err);
        if (res) {
          this.model.category.update(
            { _id: res._id },
            categorySeed[i],
            this.handleMongooseError
          );
        } else {
          this.model.category.create(categorySeed[i], this.handleMongooseError);
        }
      });
    }
  }

  private handleMongooseError(err: Error) {
    if (err) {
      console.error({ message: err.message });
      throw err;
    }
  }
}
