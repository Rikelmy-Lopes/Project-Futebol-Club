import * as express from 'express';
import LoginMiddleware from '../middleware/LoginMiddleware';
import LoginController from '../controller/LoginController';

const router = express.Router();

router.post('/login', LoginMiddleware.validateLogin, LoginController.checkPassword);

export default router;
