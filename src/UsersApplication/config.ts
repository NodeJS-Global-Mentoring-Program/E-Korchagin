import { Sequelize } from 'sequelize';

export const API_SERVER_PORT = 3000;
export const sequelize = new Sequelize(
  'postgres://txcfenoy:Qy4pmw_tpiDXMzt5jvA8fWUTFU0OoCV6@balarama.db.elephantsql.com:5432/txcfenoy',
  {
    logging: false
  }
);

export const enum DataAccessType {
  Fake,
  Seq,
}

export const currentDataAccessType = DataAccessType.Seq;
