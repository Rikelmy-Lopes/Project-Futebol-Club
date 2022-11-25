import { IMatch } from '../interface/interfaceMatch';
import TeamModel from '../database/models/TeamModel';
import MatchModel from './MatchModel';

class LeaderboardModel {
  static async getLeaderBoardHome() {
    const teamsMatchHome: IMatch[] = [];
    const teams = await TeamModel.findAll();
    const matches = await MatchModel.getAllMatches(undefined);

    teams.forEach((team) => {
      matches.forEach((match) => {
        if (match.homeTeam === team.id) {
          teamsMatchHome.push(match);
        }
      });
    });

    return teamsMatchHome;
  }
}

export default LeaderboardModel;
