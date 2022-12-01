import { Response, Request } from 'express';
import LeaderboardServicer from '../service/LeaderboardServicer';

const leaderboard = new LeaderboardServicer();

class LeaderboardController {
  static async getLeaderboardHome(_request: Request, response: Response) {
    const result = await LeaderboardServicer.getLeaderboardHome();

    response.status(200).json(result);
  }

  static async getLeaderboardAway(_request: Request, response: Response) {
    const result = await LeaderboardServicer.getLeaderboardAway();

    response.status(200).json(result);
  }

  static async getLeaderboard(_request: Request, response: Response) {
    const result = await leaderboard.getLeaderboard();

    response.status(200).json(result);
  }
}

export default LeaderboardController;
