import * as express from 'express';
import LoginMiddleware from '../middleware/LoginMiddleware';
import MatchController from '../controller/MatchController';

const router = express.Router();

router.get('/matches', MatchController.getAllMatches);

router.post('/matches', LoginMiddleware.validateToken, MatchController.addMatch);

export default router;
