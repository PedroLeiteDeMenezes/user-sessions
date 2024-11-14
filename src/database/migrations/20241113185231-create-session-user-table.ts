import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('user_session', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: 'users',
          key: 'id'
        }
      },
      sessionToken:{
        type: DataTypes.STRING,
        allowNull: false
      },
      expiresAt:{
        type: DataTypes.DATE,
        allowNull: false,
      }, 
    })
  },
  down: async (queryInterface:QueryInterface) =>  {
    await queryInterface.dropTable('user_session');
  }
}