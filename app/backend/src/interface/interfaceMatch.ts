export interface IMatchBody {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: number,
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export interface ITeamGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}
