import { Request, Response } from 'express';
import MatchService from '../service/MatchService';

const EQUAL_TEAMS_ERROR = 'It is not possible to create a match with two equal teams';
const NONEXISTENT_TEAM_ERROR = 'There is no team with such id!';

class MatchController {
  static async getAllMatches(request: Request, response: Response) {
    const { inProgress } = request.query;
    const { result } = await MatchService.getAllTeams(inProgress);

    response.status(200).json(result);
  }

  static async addMatch(request: Request, response: Response) {
    const match = request.body;
    const { error, result } = await MatchService.addMatch(match);

    if (error === EQUAL_TEAMS_ERROR) {
      return response.status(422).json({ message: EQUAL_TEAMS_ERROR });
    }
    if (error === NONEXISTENT_TEAM_ERROR) {
      return response.status(404).json({ message: NONEXISTENT_TEAM_ERROR });
    }

    response.status(201).json(result);
  }

  static async finishMatch(request: Request, response: Response) {
    const { id } = request.params;

    await MatchService.finishMatch(id);

    response.status(200).json({ message: 'Finished' });
  }
}

export default MatchController;
