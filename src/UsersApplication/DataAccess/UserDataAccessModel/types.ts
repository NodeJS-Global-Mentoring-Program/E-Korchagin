import { UserDTO } from '../../Models';

export class UserDataAccessModel {
  static getUserById: (id: string) => UserDTO | undefined;
  static updateUser: (userData: Partial<UserDTO> & Pick<UserDTO, 'Id'>) => boolean;
}
