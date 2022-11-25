import { IMatchBody, ITeamGoals } from '../interface/interfaceMatch';
import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamModel';

class MatchModel {
  static async getAllMatches(inProgress: any) {
    if (inProgress === undefined) {
      const result = await MatchesModel.findAll({
        include: [{ model: TeamModel, as: 'teamHome', attributes: { exclude: ['id', 'matches'] } },
          { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id', 'matches'] } },
        ],
      });

      return result;
    }

    const newInProgress = inProgress !== 'false';

    const result = await MatchesModel.findAll({
      where: {
        inProgress: newInProgress,
      },
      include: [{ model: TeamModel, as: 'teamHome', attributes: { exclude: ['id', 'matches'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id', 'matches'] } },
      ],
    });

    return result;
  }

  static async addMatch(match: IMatchBody) {
    const result = await MatchesModel.create({
      homeTeam: match.homeTeam,
      homeTeamGoals: match.homeTeamGoals,
      awayTeam: match.awayTeam,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    });

    return result;
  }

  static async finishMatch(id: number | string): Promise<void> {
    await MatchesModel.update({ inProgress: false }, {
      where: {
        id,
      },
    });
  }

  static async updateMatch(id: string | number, teamGoals: ITeamGoals) {
    await MatchesModel.update(
      {
        homeTeamGoals: teamGoals.homeTeamGoals,
        awayTeamGoals: teamGoals.awayTeamGoals,
      },
      {
        where: {
          id,
        },
      },
    );
  }
}

export default MatchModel;
