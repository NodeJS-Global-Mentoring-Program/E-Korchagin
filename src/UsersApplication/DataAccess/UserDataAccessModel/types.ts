import { UserDTO } from '../../Models';

export abstract class UserDataAccessModel {
  abstract getUserById = (id: string): Promise<UserDTO | undefined> => { throw new Error('Not implemented'); };
  abstract getUsersBySubstring = (substring: string, limit: number): Promise<UserDTO[]> => { throw new Error('Not implemented'); };
  abstract updateUser = (userData: Partial<UserDTO> & Pick<UserDTO, 'Id'>): Promise<boolean> => { throw new Error('Not implemented'); };
  abstract deleteUser = (id: string): Promise<boolean> => { throw new Error('Not implemented'); };
  abstract createUser = (userData: Omit<UserDTO, 'Id' | 'IsDeleted'>): Promise<string> => { throw new Error('Not implemented'); };
}
