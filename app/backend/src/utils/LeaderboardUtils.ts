import { ILeaderboard, IEfficiency, IGoals, IGames,
  IPoints } from '../interface/interfaceLeaderboard';
import { IMatch } from '../interface/interfaceMatch';
import MatchesModel from '../database/models/MatchesModel';
// import TeamModel from '../database/models/TeamModel';
import MatchModel from '../model/MatchModel';

class Leaderboard {
  private _matches: MatchesModel[] = [];
  private _leaderboard: ILeaderboard[] = [];

  verifyTeamsAlreadyCount = (id: number, teamAlreadyCount: string[]): boolean =>
  // verifica se o time ja foi contado
    !teamAlreadyCount.some((teamId) => Number(teamId) === Number(id));

  loopForPoints = (match1: IMatch): number => {
    let totalPoints = 0;
    this._matches.forEach((match2: IMatch) => {
      if (match1.homeTeam === match2.homeTeam) {
        if (match2.homeTeamGoals > match2.awayTeamGoals) {
          totalPoints += 3;
        }
        if (match2.homeTeamGoals === match2.awayTeamGoals) {
          totalPoints += 1;
        }
      }
    });

    return totalPoints;
  };

  loopForGames = (match1: IMatch): IGames => {
    const games: IGames = { totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };
    this._matches.forEach((match2: IMatch) => {
      if (match1.homeTeam === match2.homeTeam) {
        if (match2.homeTeamGoals < match2.awayTeamGoals) {
          games.totalLosses += 1; games.totalGames += 1;
        }
        if (match2.homeTeamGoals > match2.awayTeamGoals) {
          games.totalVictories += 1; games.totalGames += 1;
        } if (match2.homeTeamGoals === match2.awayTeamGoals) {
          games.totalDraws += 1; games.totalGames += 1;
        }
      }
    });
    return games;
  };

  loopForGoals = (match1: IMatch): IGoals => {
    const goals: IGoals = { goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
    };
    this._matches.forEach((match2: IMatch) => {
      if (match1.homeTeam === match2.homeTeam) {
        goals.goalsFavor += match2.homeTeamGoals;
        goals.goalsOwn += match2.awayTeamGoals;
      }
    });
    const { goalsFavor, goalsOwn } = goals;
    goals.goalsBalance = goalsFavor - goalsOwn;
    return goals;
  };

  calculatePoints = (): IPoints[] => {
    const points: IPoints[] = [];
    const teamsAlreadyCount: string[] = [];
    this._matches.forEach((match1: IMatch) => {
      const totalPoints = this.loopForPoints(match1);
      if (this.verifyTeamsAlreadyCount(match1.homeTeam, teamsAlreadyCount)) {
        points.push({
          name: match1.teamHome.teamName,
          totalPoints,
        });
      }
      teamsAlreadyCount.push(String(match1.homeTeam));
    });
    return points;
  };

  calculateGames = (): IGames[] => {
    const result: IGames[] = [];
    const teamsAlreadyCount: string[] = [];
    this._matches.forEach((match1: IMatch) => {
      const games = this.loopForGames(match1);
      if (this.verifyTeamsAlreadyCount(match1.homeTeam, teamsAlreadyCount)) {
        result.push(games);
      }
      teamsAlreadyCount.push(String(match1.homeTeam));
    });
    return result;
  };

  calculateGoals = (): IGoals[] => {
    const result: IGoals[] = [];
    const teamsAlreadyCount: string[] = [];
    this._matches.forEach((match1: IMatch) => {
      const goals = this.loopForGoals(match1);
      if (this.verifyTeamsAlreadyCount(match1.homeTeam, teamsAlreadyCount)) {
        result.push(goals);
      }
      teamsAlreadyCount.push(String(match1.homeTeam));
    });
    return result;
  };

  calculateTeamEfficiency = (points: IPoints[], games: IGames[]): IEfficiency[] => {
    const result: IEfficiency[] = [];
    let efficiency: number;
    points.forEach((_, index) => {
      efficiency = (points[index].totalPoints / (games[index].totalGames * 3)) * 100;
      result.push({
        efficiency: efficiency.toFixed(2),
      });
    });

    return result;
  };

  joinInfo = () => {
    const points = this.calculatePoints();
    const games = this.calculateGames();
    const goals = this.calculateGoals();
    const efficiency = this.calculateTeamEfficiency(points, games);
    const leaderboard: ILeaderboard[] = [];
    points.forEach((point, index) => {
      leaderboard.push({
        ...point,
        ...games[index],
        ...goals[index],
        ...efficiency[index],
      });
    });
    this._leaderboard = leaderboard;
  };

  orderMatches = (): ILeaderboard[] => {
    const leaderboard = this._leaderboard;
    const orderLeaderboard = leaderboard
      .sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);
    this._leaderboard = orderLeaderboard;

    return this._leaderboard;
  };

  getAllMatches = async (): Promise<ILeaderboard[]> => {
    this._matches = await MatchModel.getAllMatches(undefined);
    this._matches = this._matches.map((match) => match.dataValues)
      .filter((match) => match.inProgress === false);

    this.joinInfo();

    return this.orderMatches();
  };
}

export default Leaderboard;
