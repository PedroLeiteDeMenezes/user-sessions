import { Model, DataTypes, Sequelize } from 'sequelize';
import { ISession } from '../interface/ISession';
import { Models } from '../types/models';

class SessionUser extends Model<ISession> implements ISession {
  public id?: number | undefined;
  public userId?: number | undefined;
  public sessionToken!: string;
  public expiresAt!: Date;

  static associate(models: Models): void{
    this.belongsTo(models.User,{
      foreignKey: 'userId',
      as: 'user'
    })
  }

  static initialize(sequelize: Sequelize) {
    SessionUser.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        sessionToken: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'user_session',
        timestamps: false
      },
    );
  }
}


export default SessionUser