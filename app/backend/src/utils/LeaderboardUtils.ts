import { IFilterBy, IFilter, ILeaderboard, IEfficiency, IGoals, IGames,
  IPoints } from '../interface/interfaceLeaderboard';
import { IMatch } from '../interface/interfaceMatch';
import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../model/MatchModel';

class Leaderboard {
  private _matches: MatchesModel[] = [];
  private _leaderboard: ILeaderboard[] = [];
  private _teams: TeamModel[] = [];
  private _filter: IFilter = {
    primaryTeamId: 'homeTeam',
    primaryTeamGoals: 'homeTeamGoals',
    secondaryTeamGoals: 'awayTeamGoals',
  };

  constructor(filterBy: IFilterBy) {
    if (filterBy === 'home') {
      this._filter = {
        primaryTeamId: 'homeTeam',
        primaryTeamGoals: 'homeTeamGoals',
        secondaryTeamGoals: 'awayTeamGoals',
      };
    } else if (filterBy === 'away') {
      this._filter = {
        primaryTeamId: 'awayTeam',
        primaryTeamGoals: 'awayTeamGoals',
        secondaryTeamGoals: 'homeTeamGoals',
      };
    }
  }

  loopForPoints(team: TeamModel): number {
    let totalPoints = 0;
    this._matches.forEach((match: IMatch) => {
      if (team.id === match[this._filter.primaryTeamId]) {
        if (match[this._filter.primaryTeamGoals] > match[this._filter.secondaryTeamGoals]) {
          totalPoints += 3;
        }
        if (match[this._filter.primaryTeamGoals] === match[this._filter.secondaryTeamGoals]) {
          totalPoints += 1;
        }
      }
    });

    return totalPoints;
  }

  loopForGames(team: TeamModel): IGames {
    const games: IGames = { totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };
    this._matches.forEach((match: IMatch) => {
      if (team.id === match[this._filter.primaryTeamId]) {
        if (match[this._filter.primaryTeamGoals] < match[this._filter.secondaryTeamGoals]) {
          games.totalLosses += 1; games.totalGames += 1;
        }
        if (match[this._filter.primaryTeamGoals] > match[this._filter.secondaryTeamGoals]) {
          games.totalVictories += 1; games.totalGames += 1;
        } if (match[this._filter.primaryTeamGoals] === match[this._filter.secondaryTeamGoals]) {
          games.totalDraws += 1; games.totalGames += 1;
        }
      }
    });
    return games;
  }

  loopForGoals(team: TeamModel): IGoals {
    const goals: IGoals = { goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
    };
    this._matches.forEach((match: IMatch) => {
      if (team.id === match[this._filter.primaryTeamId]) {
        goals.goalsFavor += match[this._filter.primaryTeamGoals] as number;
        goals.goalsOwn += match[this._filter.secondaryTeamGoals] as number;
      }
    });
    const { goalsFavor, goalsOwn } = goals;
    goals.goalsBalance = goalsFavor - goalsOwn;
    return goals;
  }

  calculatePoints(): IPoints[] {
    const points: IPoints[] = [];
    this._teams.forEach((team: TeamModel) => {
      const totalPoints = this.loopForPoints(team);
      points.push({
        name: team.teamName,
        totalPoints,
      });
    });
    return points;
  }

  calculateGames(): IGames[] {
    const result: IGames[] = [];
    this._teams.forEach((team: TeamModel) => {
      const games = this.loopForGames(team);
      result.push(games);
    });
    return result;
  }

  calculateGoals(): IGoals[] {
    const result: IGoals[] = [];
    this._teams.forEach((team: TeamModel) => {
      const goals = this.loopForGoals(team);
      result.push(goals);
    });
    return result;
  }

  static calculateTeamEfficiency(points: IPoints[], games: IGames[]): IEfficiency[] {
    const result: IEfficiency[] = [];
    let efficiency: number;
    points.forEach((_, index) => {
      efficiency = (points[index].totalPoints / (games[index].totalGames * 3)) * 100;
      result.push({
        efficiency: efficiency.toFixed(2),
      });
    });

    return result;
  }

  joinInfo() {
    const points = this.calculatePoints();
    const games = this.calculateGames();
    const goals = this.calculateGoals();
    const efficiency = Leaderboard.calculateTeamEfficiency(points, games);
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
  }

  async getAllTeams() {
    this._teams = await TeamModel.findAll();
    this._teams = this._teams.map((team) => team.dataValues);
  }

  orderMatches(): ILeaderboard[] {
    const leaderboard = this._leaderboard;
    const orderLeaderboard = leaderboard
      .sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);
    this._leaderboard = orderLeaderboard;

    return this._leaderboard;
  }

  async getAllMatches(): Promise<ILeaderboard[]> {
    this._matches = await MatchModel.getAllMatches(undefined);
    this._matches = this._matches.map((match) => match.dataValues)
      .filter((match) => match.inProgress === false);

    await this.getAllTeams();

    this.joinInfo();

    return this.orderMatches();
  }
}

export default Leaderboard;
