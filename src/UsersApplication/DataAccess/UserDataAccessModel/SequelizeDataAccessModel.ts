import { UserDataAccessModel } from './types';
import { UserDTO, UserDataModel } from '../../Models';
import { Op } from 'sequelize';

const { v4: uuidv4 } = require('uuid');

export class SequelizeDataAccessModel extends UserDataAccessModel {
  public getUserById = async (id: string): Promise<UserDTO | undefined> => {
    const user = await UserDataModel.findOne({ where: { Id: id, IsDeleted: false } });
    return user ? user.get() : undefined;
  };

  public getUsersBySubstring = async (substring: string, limit: number): Promise<UserDTO[]> => {
    const users = await UserDataModel.findAll({
      limit,
      order: ['login'],
      where: {
        Login: {
          [Op.iLike]: `%${substring}%`
        }
      }
    });

    return users.map(user => user.get());
  };

  public updateUser = async (userData: Partial<UserDTO> & Pick<UserDTO, 'Id'>): Promise<boolean> => {
    const result = await UserDataModel.update(userData, { where: { Id: userData.Id, IsDeleted: false } });
    return !!result;
  }

  public deleteUser = async (id: string): Promise<boolean> => {
    const result = await UserDataModel.update({ IsDeleted: true }, { where: { Id: id } });
    return !!result;
  }

  public createUser = async (userData: Omit<UserDTO, 'Id' | 'IsDeleted'>): Promise<string> => {
    const result = await UserDataModel.create({
      Id: uuidv4(),
      ...userData
    });

    return result.get().Id;
  }
}
