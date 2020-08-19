import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize(
  'postgres://txcfenoy:Qy4pmw_tpiDXMzt5jvA8fWUTFU0OoCV6@balarama.db.elephantsql.com:5432/txcfenoy',
  {
    password: 'Qy4pmw_tpiDXMzt5jvA8fWUTFU0OoCV6'
  }
);

sequelize.query('SELECT * FROM users').then(res => console.log(res));
