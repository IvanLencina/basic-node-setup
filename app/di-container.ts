import {Container} from "inversify";
import {Router} from "./routes";
import {App} from "./app";
import {RegisterController} from "./controllers/registerController";

const DIContainer = new Container();
DIContainer.bind<App>(App).toSelf();
DIContainer.bind<RegisterController>(RegisterController).toSelf();
DIContainer.bind<Router>(Router).toSelf();

export default DIContainer;
