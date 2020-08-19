import { UserDTO } from '../../Models';

export class UserDataAccessModel {
  static getUserById = (id: string): UserDTO | undefined => { throw new Error('Not implemented'); };
  static getUsersBySubstring = (substring: string, limit: number): UserDTO[] => { throw new Error('Not implemented'); };
  static updateUser = (userData: Partial<UserDTO> & Pick<UserDTO, 'Id'>): boolean => { throw new Error('Not implemented'); };
  static deleteUser = (id: string): boolean => { throw new Error('Not implemented'); };
  static createUser = (userData: Omit<UserDTO, 'Id' | 'IsDeleted'>): string => { throw new Error('Not implemented'); };
}
