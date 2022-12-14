import { IMatch } from './interfaceMatch';

export interface IPoints {
  name: string;
  totalPoints: number
}

export interface IGames {
  totalGames: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
}

export interface IGoals {
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
}

export interface IEfficiency {
  efficiency: string
}

export interface ILeaderboard {
  name: string
  totalPoints: number
  totalGames: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
  efficiency: string
}
export type IFilterBy = 'home' | 'away';

export type IFilter = {
  primaryTeamId: keyof IMatch
  primaryTeamGoals: keyof IMatch
  secondaryTeamGoals: keyof IMatch
};
