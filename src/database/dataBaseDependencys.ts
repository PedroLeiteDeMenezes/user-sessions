import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database'

import User from '../models/user';

const connection = new Sequelize(databaseConfig)

const models: any[] = [User]

models.forEach((model) => {
  if(model.associate){
    model.associate(models)
  }
})


export {connection, models}