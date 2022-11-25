import * as express from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const router = express.Router();

router.get('/leaderboard/home', LeaderboardController.getLeaderBoardHome);

export default router;
