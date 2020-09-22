import { RequestHandler } from 'express';
import { GroupService } from '../../Services';
import { GroupSequelizeDataAccessModel } from '../../DataAccess';
import { CommonError } from '../CommonController';
import { FilteredGroupsQuery } from './types';

export class GroupController {
  private static groupService = new GroupService(new GroupSequelizeDataAccessModel());

  public static getGroupById: RequestHandler = async (req, res, next) => {
    const group = await GroupController.groupService.getGroupById(req.params.id);
    !group && res.status(404).json({ message: 'Group not found' });

    res.json(group);
  };

  public static updateGroup: RequestHandler = async (req, res, next) => {
    const isUpdated = await GroupController.groupService.updateGroup(req.params.id, req.body);

    if (isUpdated) {
      res.sendStatus(200);
    } else {
      const err: CommonError = {
        Message: 'Group was not delete',
        Status: 500
      };

      next(err);
    }
  }

  public static deleteGroup: RequestHandler = async (req, res, next) => {
    const isDeleted = await GroupController.groupService.deleteGroup(req.params.id);

    if (isDeleted) {
      res.sendStatus(200);
    } else {
      const err: CommonError = {
        Message: 'Group was not delete',
        Status: 500
      };

      next(err);
    }
  }

  public static createNewGroup: RequestHandler = async (req, res, next) => {
    const newGroupId = await GroupController.groupService.createGroup(req.body);
    res.json(newGroupId);
  }

  public static getGroupsByQuery: RequestHandler = async (req, res, next) => {
    const query = req.query as any as FilteredGroupsQuery;
    res.json(await GroupController.groupService.getGroupsBySubstring(query.substring, query.limit));
  }

  public static addUsersToGroup: RequestHandler = async (req, res, next) => {
    try {
      const result = await GroupController.groupService.addUsersToGroup(req.params.id, req.body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}
