import * as express from 'express';
import MatchController from '../controller/MatchController';

const router = express.Router();

router.get('/matches', MatchController.getAllMatches);

export default router;
