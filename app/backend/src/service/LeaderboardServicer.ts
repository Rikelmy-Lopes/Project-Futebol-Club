import LeaderboardModel from '../model/LeaderboardModel';

class LeaderboardServicer {
  static async getLeaderBoardHome() {
    const result = await LeaderboardModel.getLeaderBoardHome();

    return result;
  }
}

export default LeaderboardServicer;
