import { UserDTO } from '../../Models';
import { UserDataAccessModel } from '../../DataAccess';

export class UserService {
  private _userModel: typeof UserDataAccessModel;

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

  public getUsersBySubstring = (substring: string, limit: string): Omit<UserDTO, 'Password' | 'IsDeleted'>[] => {
    const users = this._userModel.getUsersBySubstring(substring, +limit);

    return users.map(user => ({
      Id: user.Id,
      Age: user.Age,
      Login: user.Login
    }));
  }

  public createUser = (userData: Omit<UserDTO, 'Id' | 'IsDeleted'>): string => this._userModel.createUser(userData);
  public deleteUser = (id: string) : boolean => this._userModel.deleteUser(id);

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
}
