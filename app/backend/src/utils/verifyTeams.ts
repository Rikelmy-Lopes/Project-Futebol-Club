import TeamModel from '../database/models/TeamModel';

export const verifyTeams = async (ids: Array<number | string>): Promise<boolean> => {
  let teamsFound = 0;
  const promises = ids.map(async (id) => {
    const result = await TeamModel.findByPk(id);
    if (result) teamsFound += 1;
  });

  await Promise.all(promises);

  return teamsFound === ids.length;
};

export const test = 'test';
