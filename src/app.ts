import * as express from "express";
import * as bodyParser from "body-parser";
import { EmailRoutes } from "./controllers/email";

class App {
  public app: express.Application;
  public email: EmailRoutes = new EmailRoutes();

  constructor() {
    this.app = express();
    this.start();
  }

  private start(): void {
   this.configure();
   this.build();
  }

  private configure(): void {
    this.app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', 'https://www.yassinebennani.com');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      next();
    });
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  private build(): void {
    this.app.use('/email', this.email.routes(express.Router()))
  }
}

export default new App().app;