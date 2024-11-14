import express from 'express';
import { Model, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import User from './models/user';
import Session from './models/userSession';

import userRoutes from '../src/routes/userRoute';
import sessionRoutes from '../src/routes/sessionRoute'
import { Models } from './types/models';



dotenv.config();
const app = express();
const port = 3334;

const sequelize = new Sequelize(
  process.env.DATABASE!,
  process.env.DATABASE_USERNAME!,
  process.env.DATABASE_PASSWORD!,
  {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    dialect: 'mysql',
  },
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

User.initialize(sequelize);
Session.initialize(sequelize)

const models: Models = {
  User: User,
  userSession: Session
}

User.associate(models);
Session.associate(models)

app.use('/users', userRoutes);
app.use('/session', sessionRoutes)

sequelize
  .sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar ao banco de dados:', err);
  });

export default app;
