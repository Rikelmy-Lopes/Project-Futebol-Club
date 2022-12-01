import * as express from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const router = express.Router();

router.get('/leaderboard/home', LeaderboardController.getLeaderBoardHome);

router.get('/leaderboard/away', LeaderboardController.getLeaderBoarAway);

export default router;
