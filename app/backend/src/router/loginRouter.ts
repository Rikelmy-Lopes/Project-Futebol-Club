import * as express from 'express';
import LoginMiddleware from '../middleware/LoginMiddleware';
import LoginController from '../controller/LoginController';

const router = express.Router();

router.get('/login/validate', LoginMiddleware.validateToken, LoginController.validateToken);

router.post('/login', LoginMiddleware.validateLogin, LoginController.checkPasswordAndEmail);

export default router;
