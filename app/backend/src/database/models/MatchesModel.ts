import { DataTypes, Model } from 'sequelize';
import TeamModel from './TeamModel';
import db from '.';

class MatchesModel extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: number;
}

MatchesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeam: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    modelName: 'matches',
    timestamps: false,
  },
);

// MatchesModel.belongsTo(TeamModel, {
//   as: 'teamHome',
//   foreignKey: 'id',

// });

MatchesModel.belongsTo(TeamModel, {
  as: 'teamHome',
  foreignKey: 'homeTeam',
});

MatchesModel.belongsTo(TeamModel, {
  as: 'teamAway',
  foreignKey: 'awayTeam',
});

export default MatchesModel;
