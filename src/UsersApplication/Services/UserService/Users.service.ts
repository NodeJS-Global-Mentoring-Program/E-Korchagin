import { UserDTO } from '../../Models';
import { UserDataAccessModel } from '../../DataAccess';

export class UserService {
  constructor(private readonly dataModel: UserDataAccessModel) { }

  public getUserById = async (id: string): Promise<Omit<UserDTO, 'Password' | 'IsDeleted'> | undefined> => {
    const user = await this.dataModel.getUserById(id);
    return user && {
      Id: user.Id,
      Age: user.Age,
      Login: user.Login
    };
  }

  public getUsersBySubstring = async (substring?: string, limit?: string): Promise<Omit<UserDTO, 'Password' | 'IsDeleted'>[]> => {
    const users = await this.dataModel.getUsersBySubstring(substring || '', limit ? +limit : 50);

    return users.map(user => ({
      Id: user.Id,
      Age: user.Age,
      Login: user.Login
    }));
  }

  public createUser = (userData: Omit<UserDTO, 'Id' | 'IsDeleted'>): Promise<string> => this.dataModel.createUser(userData);
  public deleteUser = (id: string) : Promise<boolean> => this.dataModel.deleteUser(id);

  public updateUser = (id: string, userData: Partial<Omit<UserDTO, 'IsDeleted' | 'Id'>>): Promise<boolean> => {
    const toUpdateData: { [field: string]: any } = {
      Id: id,
      Age: userData.Age,
      Login: userData.Login,
      Password: userData.Password
    };

    Object.keys(toUpdateData).forEach(key => toUpdateData[key] === undefined && delete toUpdateData[key]);
    return this.dataModel.updateUser(toUpdateData as Partial<UserDTO> & Pick<UserDTO, 'Id'>);
  };
}
