import userRoutes from './apps/User/routes';

import { Router } from 'express';

const routes = Router();

routes.use('/rabbit', userRoutes);

export default routes;
