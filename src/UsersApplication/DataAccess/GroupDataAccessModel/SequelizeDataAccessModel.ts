import { GroupDataAccessModel } from './types';
import { GroupDTO, GroupDataModel, UserGroupDataModel } from '../../Models';
import { Op } from 'sequelize';

const { v4: uuidv4 } = require('uuid');

export class GroupSequelizeDataAccessModel extends GroupDataAccessModel {
  public getGroupById = async (id: string): Promise<GroupDTO | undefined> => {
    const group = await GroupDataModel.findOne({ where: { Id: id } });
    return group ? group.get() : undefined;
  };

  public getGroupsBySubstring = async (substring: string, limit: number): Promise<GroupDTO[]> => {
    const groups = await GroupDataModel.findAll({
      limit,
      order: ['name'],
      where: {
        Name: {
          [Op.iLike]: `%${substring}%`
        }
      }
    });

    return groups.map(group => group.get());
  };

  public updateGroup = async (groupData: Partial<GroupDTO> & Pick<GroupDTO, 'Id'>): Promise<boolean> => {
    const result = await GroupDataModel.update(groupData, { where: { Id: groupData.Id } });
    return !!result;
  }

  public deleteGroup = async (id: string): Promise<boolean> => {
    const result = await GroupDataModel.destroy({ where: { Id: id } });
    return !!result;
  }

  public addUsersToGroup = async (groupId: string, userIds: string[]): Promise<void> => {
    await UserGroupDataModel.bulkCreate(
      userIds.map(userId => ({
        UserId: userId,
        GroupId: groupId
      }))
    );
  }

  public createGroup = async (groupData: Omit<GroupDTO, 'Id'>): Promise<string> => {
    const result = await GroupDataModel.create({
      Id: uuidv4(),
      ...groupData
    });

    return result.get().Id;
  }
}
