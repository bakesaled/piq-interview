import { Application } from 'express';
import * as express from 'express';
import bodyParser = require('body-parser');
import { DefaultConfig } from './config/default';
import * as mongoose from 'mongoose';
import Q = require('q');

export class AppServer {
  public app: Application;

  constructor() {
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
    const connection: mongoose.Connection | any = mongoose.createConnection(
      DefaultConfig.database,
      DefaultConfig.dbOptions
    );

    console.log(`connected to '${connection.name}' on '${connection.host}'`);
  }
}
