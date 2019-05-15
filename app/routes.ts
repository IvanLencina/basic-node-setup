import * as express from 'express';
import {RegisterController} from "./controllers/registerController";
import bodyParser from "body-parser";
import {App} from "./app";
import {inject, injectable} from "inversify";
import {IRouter} from "./interfaces/router.interface";

@injectable()
export class Router implements IRouter {
  private appInstance = express.application;
  private registerController: RegisterController;

  constructor(@inject(RegisterController) exampleController: RegisterController) {
    this.registerController = exampleController;
  }

  public init(app: App) {
    this.appInstance = app.getAppInstance();

    this.initializeMiddlewares();
    this.intializeRoutes();
  }

  private initializeMiddlewares() {
    this.appInstance.use(bodyParser.urlencoded({extended: true}));
    this.appInstance.use(bodyParser.json());
  }

  private intializeRoutes() {
    this.appInstance.route('/')
      .get((request: express.Request, response: express.Response) => {
        response.send('Request me, come on!');
      });

    this.appInstance.route('/register')
      .all(this.registerController.byPass.bind(this.registerController))
      .post(this.registerController.create.bind(this.registerController))
  }
}