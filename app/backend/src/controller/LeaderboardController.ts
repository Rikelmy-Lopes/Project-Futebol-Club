import { Response, Request } from 'express';
import LeaderboardServicer from '../service/LeaderboardServicer';

class LeaderboardController {
  static async getLeaderBoardHome(_request: Request, response: Response) {
    const result = await LeaderboardServicer.getLeaderBoardHome();

    response.status(200).json(result);
  }
}

export default LeaderboardController;
