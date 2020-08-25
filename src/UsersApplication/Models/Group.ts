import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type GroupDTO = {
  Id: string;
  Name: string;
  Permissions: Permission[];
}

interface GroupCreationAttributes extends GroupDTO {}

export const GroupDataModel = sequelize.define<Model<GroupDTO, GroupCreationAttributes>>('Group', {
  Id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    field: 'id'
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name'
  },
  Permissions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    field: 'permissions'
  }
}, {
  tableName: 'groups',
  createdAt: false,
  updatedAt: false
});
