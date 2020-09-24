import { RequestHandler } from 'express';
import { UserService } from '../../Services';
import { UserSequelizeDataAccessModel, UserDataAccessModel, FakeUserDataAccessModel } from '../../DataAccess';
import { CommonError } from '../CommonController';
import { FilteredUsersQuery } from './types';
import { DataAccessType, currentDataAccessType } from '../../config';

export const dataAccessMap = new Map<DataAccessType, UserDataAccessModel>([
  [DataAccessType.Fake, new FakeUserDataAccessModel()],
  [DataAccessType.Seq, new UserSequelizeDataAccessModel()]
]);

/**
 * Provides functions for Users API
 */
export class UserController {
  private static userService = new UserService(dataAccessMap.get(currentDataAccessType)!);

  /**
   * Find User by `id` param
   */
  public static getUserById: RequestHandler = async (req, res, next) => {
    try {
      const user = await UserController.userService.getUserById(req.params.id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  };

  /**
   * Update User by `id` param and request `body` data
   */
  public static updateUser: RequestHandler = async (req, res, next) => {
    try {
      await UserController.userService.updateUser(req.params.id, req.body);
      res.sendStatus(200);
    } catch (e) {
      const err: CommonError = {
        Message: 'User was not delete',
        Status: 500
      };

      next(err);
    }
  }

  /**
   * Delete User by `id` param
   */
  public static deleteUser: RequestHandler = async (req, res, next) => {
    try {
      await UserController.userService.deleteUser(req.params.id);
      res.sendStatus(200);
    } catch (e) {
      const err: CommonError = {
        Message: 'User was not delete',
        Status: 500
      };

      next(err);
    }
  }

  /**
   * Create new User by request `body` data
   */
  public static createNewUser: RequestHandler = async (req, res, next) => {
    try {
      const newUserId = await UserController.userService.createUser(req.body);
      res.json(newUserId);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Get Users list by `query` params
   * - `limit`: max number of users
   * - `substring`: user login part
   */
  public static getUsersByQuery: RequestHandler = async (req, res, next) => {
    try {
      const query = req.query as any as FilteredUsersQuery;
      res.json(await UserController.userService.getUsersBySubstring(query.substring, query.limit));
    } catch (e) {
      next(e);
    }
  }
}
