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
}

export default MatchModel;
