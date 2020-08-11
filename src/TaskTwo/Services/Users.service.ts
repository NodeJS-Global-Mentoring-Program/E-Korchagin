import fs from 'fs';
import { UserDTO, User, NewUser } from '../Entities';

const { v4: uuidv4 } = require('uuid');

export class UserService {
  public static instance = new UserService();
  private readonly _users: UserDTO[];
  private readonly _usersMap: Map<string, UserDTO>;

  constructor() {
    let rawdata = fs.readFileSync('src/TaskTwo/fakeUsers.json', { encoding: 'utf-8' });
    this._users = JSON.parse(rawdata) as UserDTO[];
    this._usersMap = new Map(this._users.map(user => [user.Id, user]));
  }

  public getUserBuId(id: string): User | undefined {
    const user = this._usersMap.get(id);
    return user && !user.IsDeleted
      ? {
        Id: user.Id,
        Age: user.Age,
        Login: user.Login,
      }
      : undefined;
  }

  public createUser(newUserData: NewUser): string {
    const newUser: UserDTO = {
      Id: uuidv4(),
      Age: newUserData.Age,
      Login: newUserData.Login,
      Password: newUserData.Password,
      IsDeleted: false
    }

    this._users.push(newUser);
    this._usersMap.set(newUser.Id, newUser);

    return newUser.Id;
  }

  public updateUser(userData: User): boolean {
    const user = this._usersMap.get(userData.Id);

    return user
      ? !!this._usersMap.set(user.Id, {
        ...user,
        Age: userData.Age,
        Login: userData.Login
      })
      : false;
  }

  public deleteUser(userId: string): boolean {
    const user = this._usersMap.get(userId);
    user && (user.IsDeleted = true);
    return true;
  }
}