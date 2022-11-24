import * as express from 'express';
import TeamController from '../controller/TeamController';

const router = express.Router();

router.get('/teams', TeamController.getAllTeams);

router.get('/teams/:id', TeamController.getTeamById);

export default router;
