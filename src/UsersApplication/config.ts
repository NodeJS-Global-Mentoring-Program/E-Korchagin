import { Sequelize } from 'sequelize';
const SequelizeMock = require('sequelize-mock');
require('dotenv').config();

export const API_SERVER_PORT = 3000;
export const sequelize = process.env.TEST === 'true'
  ? new SequelizeMock()
  : new Sequelize(
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
