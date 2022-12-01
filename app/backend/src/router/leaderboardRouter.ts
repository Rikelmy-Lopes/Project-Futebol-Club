import * as express from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const router = express.Router();

router.get('/leaderboard/home', LeaderboardController.getLeaderboardHome);

router.get('/leaderboard/away', LeaderboardController.getLeaderboardAway);

router.get('/leaderboard', LeaderboardController.getLeaderboard);

export default router;
