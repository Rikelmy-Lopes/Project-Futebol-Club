// import { ITeam } from '../interface/interfaceTeam';
import TeamModel from '../database/models/TeamModel';

class TeamsModel {
  static async getAllTeams() {
    const result = await TeamModel.findAll();

    return result;
  }

  static async getTeamById(id: number | string) {
    const result = await TeamModel.findByPk(id);

    return result;
  }
}

export default TeamsModel;
