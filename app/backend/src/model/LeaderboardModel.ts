// import { IMatch } from '../interface/interfaceMatch';
// import TeamModel from '../database/models/TeamModel';
// import MatchModel from './MatchModel';
// import { getAllMatchesHome } from '../utils/LeaderboardUtils';

import Leaderboard from '../utils/LeaderboardUtils';

const leaderboardHome = new Leaderboard();

class LeaderboardModel {
  static async getLeaderBoardHome() {
    const teamsMatchHome = await leaderboardHome.getAllMatches();
    return teamsMatchHome;
  }
}

export default LeaderboardModel;
