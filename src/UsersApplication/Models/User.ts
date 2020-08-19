import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';

export interface UserDTO {
  Id: string;
  Login: string;
  Age: number;
  Password: string;
  IsDeleted: boolean;
}

interface UserCreationAttributes extends Optional<UserDTO, 'IsDeleted'> {}

export const UserDataModel = sequelize.define<Model<UserDTO, UserCreationAttributes>>('User', {
  Id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    field: 'id'
  },
  Login: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'login'
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password'
  },
  Age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'age'
  },
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'isDeleted'
  }
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false
});
