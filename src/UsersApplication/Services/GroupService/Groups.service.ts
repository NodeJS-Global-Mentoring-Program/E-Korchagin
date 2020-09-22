import { GroupDTO } from '../../Models';
import { GroupDataAccessModel } from '../../DataAccess';

export class GroupService {
  constructor(private readonly dataModel: GroupDataAccessModel) { }

  public getGroupById = async (id: string): Promise<GroupDTO | undefined> => this.dataModel.getGroupById(id);

  public getGroupsBySubstring = async (substring?: string, limit?: string): Promise<GroupDTO[]> =>
    this.dataModel.getGroupsBySubstring(substring || '', limit ? +limit : 50);

  public createGroup = (groupData: Omit<GroupDTO, 'Id'>): Promise<string> => this.dataModel.createGroup(groupData);
  public deleteGroup = (id: string) : Promise<boolean> => this.dataModel.deleteGroup(id);

  public updateGroup = (id: string, groupData: Partial<Omit<GroupDTO, 'Id'>>): Promise<boolean> => {
    const toUpdateData: { [field: string]: any } = {
      Id: id,
      Name: groupData.Name,
      Permissions: groupData.Permissions
    };

    Object.keys(toUpdateData).forEach(key => toUpdateData[key] === undefined && delete toUpdateData[key]);
    return this.dataModel.updateGroup(toUpdateData as Partial<GroupDTO> & Pick<GroupDTO, 'Id'>);
  };

  public addUsersToGroup = (groupId: string, userIds: string[]): Promise<void> => this.dataModel.addUsersToGroup(groupId, userIds);
}
