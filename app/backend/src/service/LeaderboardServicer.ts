import { ILeaderboard } from '../interface/interfaceLeaderboard';
import LeaderboardModel from '../model/LeaderboardModel';

const leaderboardHome = new LeaderboardModel('home');

const leaderboardAway = new LeaderboardModel('away');

class LeaderboardServicer {
  private _leaderboard: ILeaderboard[] = [];
  static async getLeaderboardHome() {
    const result = await leaderboardHome.getLeaderboard();

    return result;
  }

  static async getLeaderboardAway() {
    const result = await leaderboardAway.getLeaderboard();

    return result;
  }

  static orderByName(a: ILeaderboard, b: ILeaderboard) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  }

  joinLeaderboard(homeLeaderboard: ILeaderboard[], awayLeaderboard: ILeaderboard[]): void {
    this._leaderboard = homeLeaderboard.map((home: ILeaderboard, index: number) => {
      const efficiency = ((home.totalPoints + awayLeaderboard[index].totalPoints)
      / ((home.totalGames + awayLeaderboard[index].totalGames) * 3)) * 100;

      const result = {
        name: home.name,
        totalPoints: home.totalPoints + awayLeaderboard[index].totalPoints,
        totalGames: home.totalGames + awayLeaderboard[index].totalGames,
        totalVictories: home.totalVictories + awayLeaderboard[index].totalVictories,
        totalDraws: home.totalDraws + awayLeaderboard[index].totalDraws,
        totalLosses: home.totalLosses + awayLeaderboard[index].totalLosses,
        goalsFavor: home.goalsFavor + awayLeaderboard[index].goalsFavor,
        goalsOwn: home.goalsOwn + awayLeaderboard[index].goalsOwn,
        goalsBalance: home.goalsBalance + awayLeaderboard[index].goalsBalance,
        efficiency: efficiency.toFixed(2),
      };
      return result;
    });
  }

  orderLeaderboard(): ILeaderboard[] {
    const leaderboard = this._leaderboard;
    const orderLeaderboard = leaderboard
      .sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);
    this._leaderboard = orderLeaderboard;

    return this._leaderboard;
  }

  async getLeaderboard() {
    const homeLeaderboard = await (await leaderboardHome.getLeaderboard())
      .sort(LeaderboardServicer.orderByName);
    const awayLeaderboard = await (await leaderboardAway.getLeaderboard())
      .sort(LeaderboardServicer.orderByName);

    this.joinLeaderboard(homeLeaderboard, awayLeaderboard);

    return this.orderLeaderboard();
  }
}

export default LeaderboardServicer;
