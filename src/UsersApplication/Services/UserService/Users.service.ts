import { UserDTO } from '../../Models';
import { UserDataAccessModel } from '../../DataAccess';

const { v4: uuidv4 } = require('uuid');

export class UserService {
  private _userModel: typeof UserDataAccessModel;

  /**
   * Creates `UserService` with palicular `DataModel`
   */
  constructor(userModelClass: typeof UserDataAccessModel) {
    this._userModel = userModelClass;
  }

  public getUserById = (id: string): Omit<UserDTO, 'Password' | 'IsDeleted'> | undefined => {
    const user = this._userModel.getUserById(id);
    return user && {
      Id: user.Id,
      Age: user.Age,
      Login: user.Login
    };
  }

  public getUsersBySubstring = (id: string, limit: string): Omit<UserDTO, 'Password' | 'IsDeleted'>[] => {
    const user = this._userModel.getUserById(id);
    // delete user.IsDeleted;
    // delete user.Password;
    // .slice(0, limit ? +limit : 5))
    return [];
  }

  public createUser = (userData: Omit<UserDTO, 'Id' | 'IsDeleted'>): boolean => {
    return true;
  }

  public updateUser = (id: string, userData: Partial<Omit<UserDTO, 'IsDeleted' | 'Id'>>): boolean => {
    const toUpdateData: { [field: string]: any } = {
      Id: id,
      Age: userData.Age,
      Login: userData.Login,
      Password: userData.Password
    };

    Object.keys(toUpdateData).forEach(key => toUpdateData[key] === undefined && delete toUpdateData[key]);
    return this._userModel.updateUser(toUpdateData as Partial<UserDTO> & Pick<UserDTO, 'Id'>);
  };

  public deleteUser = (id: string): boolean => {
    return true;
  }
}
