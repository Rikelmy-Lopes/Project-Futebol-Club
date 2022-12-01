import LeaderboardModel from '../model/LeaderboardModel';

const leaderboardHome = new LeaderboardModel('home');

const leaderboardAway = new LeaderboardModel('away');

class LeaderboardServicer {
  static async getLeaderboardHome() {
    const result = await leaderboardHome.getLeaderboard();

    return result;
  }

  static async getLeaderboardAway() {
    const result = await leaderboardAway.getLeaderboard();

    return result;
  }
}

export default LeaderboardServicer;
