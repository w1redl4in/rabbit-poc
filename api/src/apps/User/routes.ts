import * as UserController from './UserController';

import { Router } from 'express';

const routes = Router();

routes.post('/publish', UserController.create);
routes.get('/consume', UserController.consume);

export default routes;
