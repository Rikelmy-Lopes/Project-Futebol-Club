// import { IMatch } from '../interface/interfaceMatch';
// import TeamModel from '../database/models/TeamModel';
// import MatchModel from './MatchModel';
import { getAllMatchesHome } from '../utils/LeaderboardUtils';

class LeaderboardModel {
  static async getLeaderBoardHome() {
    const teamsMatchHome = getAllMatchesHome();
    return teamsMatchHome;
  }
}

export default LeaderboardModel;
