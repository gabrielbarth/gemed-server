import express from 'express';
import UserController from './controllers/userController';
import SessionController from './controllers/sessionController';
import InternalCommunicationController from './controllers/internalCommunicationController';
import ExternalCommunicationController from './controllers/externalCommunicationController';
import ValidityController from './controllers/validityController';


import authMididleware from './middlewares/auth';

const routes = express.Router();
const userController = new UserController();
const sessionController = new SessionController();
const internalCommunicationController = new InternalCommunicationController();
const externalCommunicationController = new ExternalCommunicationController();
const validityController = new ValidityController();

routes.post('/users/register', userController.store);
routes.post('/users/auth', sessionController.store);

routes.use(authMididleware);

routes.post('/internal-communications', internalCommunicationController.store);
routes.get('/internal-communications', internalCommunicationController.index);
routes.put('/internal-communications/:communicationId', internalCommunicationController.update);
routes.delete('/internal-communications/:communicationId', internalCommunicationController.delete);

routes.post('/external-communications', externalCommunicationController.store);
routes.get('/external-communications', externalCommunicationController.index);
routes.put('/external-communications/:communicationId', externalCommunicationController.update);
routes.delete('/external-communications/:communicationId', externalCommunicationController.delete);

routes.post('/renew', validityController.store);

export default routes;