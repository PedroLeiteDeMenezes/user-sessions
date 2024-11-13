import express from 'express';
import { Model, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import User from './models/user';

import userRoutes from '../src/routes/userRoute';

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

app.use('/users', userRoutes);

sequelize
  .sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar ao banco de dados:', err);
  });

export default app;
