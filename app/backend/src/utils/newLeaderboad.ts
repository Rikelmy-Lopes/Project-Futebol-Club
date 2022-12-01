import { IFilterBy, ILeaderboard } from '../interface/interfaceLeaderboard';
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../model/MatchModel';
import MatchesModel from '../database/models/MatchesModel';

class Leaderboard2 {
  private _leaderboard: ILeaderboard[];
  private _matches: MatchesModel[];
  private _filterBy: IFilterBy;

  constructor(filterBy: IFilterBy) {
    this._leaderboard = [];
    this._matches = [];
    this._filterBy = filterBy;
  }

  getAllMatches = async (): Promise<void> => {
    this._matches = await MatchModel.getAllMatches(undefined);
    this._matches = this._matches.map((match) => match.dataValues)
      .filter((match) => match.inProgress === false);
  };

  createLeaderboard = async (): Promise<ILeaderboard[]> => {
    const teams = await TeamModel.findAll();
    this._leaderboard = teams.map((team) => ({
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '',
    }));

    await this.getAllMatches();
    await this.addToLeaderboard(this._filterBy);
    return this.orderMatches();
  };

  addToLeaderboardHome = (match: MatchesModel, index: number): void => {
    const leaderboardTeam = this._leaderboard[index];
    leaderboardTeam.totalGames += 1;
    leaderboardTeam.goalsFavor += match.homeTeamGoals;
    leaderboardTeam.goalsOwn += match.awayTeamGoals;
    leaderboardTeam.goalsBalance = leaderboardTeam.goalsFavor - leaderboardTeam.goalsOwn;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      leaderboardTeam.totalVictories += 1;
      leaderboardTeam.totalPoints += 3;
    } if (match.homeTeamGoals === match.awayTeamGoals) {
      leaderboardTeam.totalDraws += 1;
      leaderboardTeam.totalPoints += 1;
    } else {
      leaderboardTeam.totalLosses += 1;
    }
    const efficiency = (leaderboardTeam.totalPoints / (leaderboardTeam.totalGames * 3)) * 100;
    leaderboardTeam.efficiency = efficiency.toFixed(2);
  };

  addToLeaderboardAway = (match: MatchesModel, index: number): void => {
    const leaderboardTeam = this._leaderboard[index];
    leaderboardTeam.totalGames += 1;
    leaderboardTeam.goalsFavor += match.awayTeamGoals;
    leaderboardTeam.goalsOwn += match.homeTeamGoals;
    leaderboardTeam.goalsBalance = leaderboardTeam.goalsFavor - leaderboardTeam.goalsOwn;
    if (match.awayTeamGoals > match.homeTeamGoals) {
      leaderboardTeam.totalVictories += 1;
      leaderboardTeam.totalPoints += 3;
    } if (match.homeTeamGoals === match.awayTeamGoals) {
      leaderboardTeam.totalDraws += 1;
      leaderboardTeam.totalPoints += 1;
    } else {
      leaderboardTeam.totalLosses += 1;
    }
    const efficiency = (leaderboardTeam.totalPoints / (leaderboardTeam.totalGames * 3)) * 100;
    leaderboardTeam.efficiency = efficiency.toFixed(2);
  };

  addToLeaderboard = async (filterBy: string): Promise<void> => {
    const matches = this._matches;
    const leaderboard = this._leaderboard;
    matches.forEach((match) => {
      if (filterBy === 'home') {
        const teamIndex: number = leaderboard
          .findIndex((team) => team.name === match.teamHome.teamName);
        if (teamIndex !== -1) {
          this.addToLeaderboardHome(match, teamIndex);
        }
      }
      if (filterBy === 'away') {
        const teamIndex: number = leaderboard
          .findIndex((team) => team.name === match.teamAway.teamName);
        if (teamIndex !== -1) {
          this.addToLeaderboardAway(match, teamIndex);
        }
      }
    });
  };

  orderMatches = (): ILeaderboard[] => {
    const leaderboard = this._leaderboard;
    this._leaderboard = leaderboard
      .sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);

    return this._leaderboard;
  };
}

export default Leaderboard2;
