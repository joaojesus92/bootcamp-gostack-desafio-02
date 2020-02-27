import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
// import authMiddleware from './app/middlewares/auth';
import authMiddlewareRecipients from './app/middlewares/authRecipients';
import RecipientsController from './app/controllers/RecipientsController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// routes.use(authMiddleware);
routes.use(authMiddlewareRecipients);

routes.post('/recipients', RecipientsController.store);
routes.put('/recipients', RecipientsController.update);
// routes.put('/users', UserController.update);

export default routes;
