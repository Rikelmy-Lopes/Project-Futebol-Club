import * as express from 'express';
import TeamController from '../controller/TeamController';

const router = express.Router();

router.get('/teams', TeamController.getAllTeams);

export default router;
