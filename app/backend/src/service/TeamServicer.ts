import TeamsModel from '../model/TeamModel';

class TeamServicer {
  static async getAllTeams() {
    const result = await TeamsModel.getAllTeams();

    return { error: null, result };
  }

  static async getTeamById(id: number | string) {
    const result = await TeamsModel.getTeamById(id);

    return { error: null, result };
  }
}

export default TeamServicer;
