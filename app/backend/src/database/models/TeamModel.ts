import { DataTypes, Model } from 'sequelize';
import db from '.';
// import MatchesModel from './MatchesModel';

class TeamModel extends Model {
  declare id: number;
  declare teamName: number;
}

TeamModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);

// TeamModel.hasMany(MatchesModel, {
//   as: 'matches',
//   foreignKey: 'home_team',
// });

export default TeamModel;
