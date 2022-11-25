import { verifyTeams } from '../utils/verifyTeams';
import { IMatchBody, ITeamGoals } from '../interface/interfaceMatch';
import MatchModel from '../model/MatchModel';

class MatchService {
  static async getAllTeams(inProgress: any) {
    const result = await MatchModel.getAllMatches(inProgress);

    return { error: null, result };
  }

  static async addMatch(match: IMatchBody) {
    if (match.homeTeam === match.awayTeam) {
      return { error: 'It is not possible to create a match with two equal teams', result: null };
    }

    if (await verifyTeams([match.awayTeam, match.homeTeam])) {
      const result = await MatchModel.addMatch(match);

      return { error: null, result };
    }

    return { error: 'There is no team with such id!', result: null };
  }

  static async finishMatch(id: number | string): Promise<void> {
    await MatchModel.finishMatch(id);
  }

  static async updateMatch(id: number | string, teamGoals: ITeamGoals): Promise<void> {
    await MatchModel.updateMatch(id, teamGoals);
  }
}

export default MatchService;
