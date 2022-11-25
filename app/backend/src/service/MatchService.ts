import MatchModel from '../model/MatchModel';

class MatchService {
  static async getAllTeams(inProgress: any) {
    const result = await MatchModel.getAllMatches(inProgress);

    return { error: null, result };
  }
}

export default MatchService;
