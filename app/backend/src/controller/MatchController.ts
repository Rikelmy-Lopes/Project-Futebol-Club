import { Request, Response } from 'express';
import MatchService from '../service/MatchService';

class MatchController {
  static async getAllMatches(request: Request, response: Response) {
    const { inProgress } = request.query;
    const { result } = await MatchService.getAllTeams(inProgress);

    response.status(200).json(result);
  }
}

export default MatchController;
