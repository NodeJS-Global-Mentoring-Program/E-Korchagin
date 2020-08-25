import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';

export type UserGroupDTO = {
  UserId: string;
  GroupId: string;
}

interface UserGroupCreationAttributes extends UserGroupDTO {}

export const UserGroupDataModel = sequelize.define<Model<UserGroupDTO, UserGroupCreationAttributes>>('UserGroup', {
  UserId: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    field: 'userId'
  },
  GroupId: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    field: 'groupId'
  }
}, {
  tableName: 'userGroup',
  createdAt: false,
  updatedAt: false
});
