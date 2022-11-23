import * as express from 'express';
import LoginController from '../controller/LoginController';

const router = express.Router();

router.post('/login', LoginController.checkPassword);

export default router;
