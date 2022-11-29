import { ILeaderboard, IEfficiency, IGoals, IGames,
  IPoints } from '../interface/interfaceLeaderboard';
import { IMatch } from '../interface/interfaceMatch';
import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamModel';

const verifyTeamsAlreadyCount = (id: number, teamAlreadyCount: string[]): boolean =>
  // verifica se o time ja foi contado
  !teamAlreadyCount.some((teamId) => Number(teamId) === Number(id));

const loopForPoints = (match1: IMatch, matches: IMatch[]): number => {
  let totalPoints = 0;

  matches.forEach((match2: IMatch) => {
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

const loopForGames = (match1: IMatch, matches: IMatch[]): IGames => {
  const games: IGames = { totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
  };
  matches.forEach((match2: IMatch) => {
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

const loopForGoals = (match1: IMatch, matches: IMatch[]): IGoals => {
  const goals: IGoals = { goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
  };
  matches.forEach((match2: IMatch) => {
    if (match1.homeTeam === match2.homeTeam) {
      goals.goalsFavor += match2.homeTeamGoals;
      goals.goalsOwn += match2.awayTeamGoals;
    }
  });
  const { goalsFavor, goalsOwn } = goals;
  goals.goalsBalance = goalsFavor - goalsOwn;
  return goals;
};

const calculatePoints = (matches: IMatch[]): IPoints[] => {
  const points: IPoints[] = [];
  const teamsAlreadyCount: string[] = [];
  matches.forEach((match1: IMatch) => {
    const totalPoints = loopForPoints(match1, matches);
    if (verifyTeamsAlreadyCount(match1.homeTeam, teamsAlreadyCount)) {
      points.push({
        name: match1.teamHome.teamName,
        totalPoints,
      });
    }
    teamsAlreadyCount.push(String(match1.homeTeam));
  });
  return points;
};

const calculateGames = (matches: IMatch[]): IGames[] => {
  const result: IGames[] = [];
  const teamsAlreadyCount: string[] = [];
  matches.forEach((match1: IMatch) => {
    const games = loopForGames(match1, matches);
    if (verifyTeamsAlreadyCount(match1.homeTeam, teamsAlreadyCount)) {
      result.push(games);
    }
    teamsAlreadyCount.push(String(match1.homeTeam));
  });
  return result;
};

const calculateGoals = (matches: IMatch[]): IGoals[] => {
  const result: IGoals[] = [];
  const teamsAlreadyCount: string[] = [];
  matches.forEach((match1: IMatch) => {
    const goals = loopForGoals(match1, matches);
    if (verifyTeamsAlreadyCount(match1.homeTeam, teamsAlreadyCount)) {
      result.push(goals);
    }
    teamsAlreadyCount.push(String(match1.homeTeam));
  });
  return result;
};

const calculateTeamEfficiency = (points: IPoints[], games: IGames[]): IEfficiency[] => {
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

const joinInfo = (matches: IMatch[]): ILeaderboard[] => {
  const points = calculatePoints(matches);
  const games = calculateGames(matches);
  const goals = calculateGoals(matches);
  const efficiency = calculateTeamEfficiency(points, games);
  const join: ILeaderboard[] = [];
  points.forEach((point, index) => {
    join.push({
      ...point,
      ...games[index],
      ...goals[index],
      ...efficiency[index],
    });
  });

  return join;
};

const orderMatches = (matches: IMatch[]): ILeaderboard[] => {
  const result = joinInfo(matches);
  const orderResult = result
    .sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);
  return orderResult;
};

export const getAllMatchesHome = async (): Promise<ILeaderboard[]> => {
  const matches = await MatchesModel.findAll({
    where: {
      inProgress: false,
    },
    include: [{ model: TeamModel, as: 'teamHome', attributes: { exclude: ['id', 'matches'] } },
      { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id', 'matches'] } },
    ],
  });

  const newMatches = JSON.stringify(matches);

  return orderMatches(JSON.parse(newMatches) as IMatch[]);
};

export const func = '';
