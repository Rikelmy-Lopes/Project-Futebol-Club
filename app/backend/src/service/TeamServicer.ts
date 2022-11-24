import TeamsModel from '../model/TeamModel';

class TeamServicer {
  static async getAllTeams() {
    const result = await TeamsModel.getAllTeams();

    return result;
  }
}

export default TeamServicer;
