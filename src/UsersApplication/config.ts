import { Sequelize } from 'sequelize';
require('dotenv').config();

export const API_SERVER_PORT = 3000;
export const sequelize = new Sequelize(
  process.env.DB_STRING!,
  {
    logging: false
  }
);

export const enum DataAccessType {
  Fake,
  Seq,
}

export const currentDataAccessType = DataAccessType.Seq;
