import { Request, Response } from 'express';
import TeamServicer from '../service/TeamServicer';

class TeamController {
  static async getAllTeams(_request: Request, response: Response) {
    const result = await TeamServicer.getAllTeams();

    response.status(200).json(result);
  }
}

export default TeamController;
