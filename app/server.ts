import 'reflect-metadata';
import {App} from './app';
import {Router} from "./routes";
import DIContainer from './di-container';

const app: App = DIContainer.resolve<App>(App);
const router: Router = DIContainer.resolve<Router>(Router);

app.setPort(3000);
app.listen();

router.init(app);