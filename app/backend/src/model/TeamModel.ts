// import { ITeam } from '../interface/interfaceTeam';
import TeamModel from '../database/models/TeamModel';

class TeamsModel {
  static async getAllTeams() {
    const result = await TeamModel.findAll();

    return result;
  }
}

export default TeamsModel;
