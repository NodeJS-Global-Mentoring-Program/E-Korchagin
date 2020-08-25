import { GroupDTO } from '../../Models';

export abstract class GroupDataAccessModel {
  abstract getGroupById = (id: string): Promise<GroupDTO | undefined> => { throw new Error('Not implemented'); };
  abstract getGroupsBySubstring = (substring: string, limit: number): Promise<GroupDTO[]> => { throw new Error('Not implemented'); };
  abstract updateGroup = (groupData: Partial<GroupDTO> & Pick<GroupDTO, 'Id'>): Promise<boolean> => { throw new Error('Not implemented'); };
  abstract deleteGroup = (id: string): Promise<boolean> => { throw new Error('Not implemented'); };
  abstract createGroup = (groupData: Omit<GroupDTO, 'Id'>): Promise<string> => { throw new Error('Not implemented'); };
  abstract addUsersToGroup = (groupId: string, userIds: string[]): Promise<void> => { throw new Error('Not implemented'); };
}
