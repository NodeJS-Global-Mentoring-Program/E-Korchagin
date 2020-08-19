import { UserDTO } from '../../Models';
import { UserDataAccessModel } from './types';

const users: UserDTO[] = [
  {
    Id: '51de05ae-4625-46ca-87f2-db79554044e2',
    Login: 'troubleshooter',
    Password: 'wWwWRY021297',
    Age: 23,
    IsDeleted: false
  },
  {
    Id: '9d533a95-502c-4bb8-b4b5-224375f6fb8e',
    Login: 'an4oycuk',
    Password: 'an4oycuk120498',
    Age: 15,
    IsDeleted: false
  },
  {
    Id: '2af013e5-4504-436d-92f1-2bd1512009a5',
    Login: 'krai',
    Password: 'kraiBabyKrai',
    Age: 22,
    IsDeleted: false
  },
  {
    Id: 'd79ec4b1-8b80-400a-9083-5cb4588c53bc',
    Login: 'Daria64',
    Password: 'ubivator228',
    Age: 23,
    IsDeleted: true
  }
];

export class FakeUserDataAccessModel implements UserDataAccessModel {
  public static getUserById = (id: string): UserDTO | undefined => users.find(user => user.IsDeleted === false && user.Id === id);
  public static updateUser = (userData: Partial<UserDTO> & Pick<UserDTO, 'Id'>): boolean => {
    const user = FakeUserDataAccessModel.getUserById(userData.Id);
    return !!Object.assign(user, userData);
  }
}
