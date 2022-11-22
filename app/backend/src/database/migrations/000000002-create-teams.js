module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('teams', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
        },
        team_name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
      });
    },
    
    down: async (queryInterface) => {
      await queryInterface.dropTable('teams');
    },
  };
  