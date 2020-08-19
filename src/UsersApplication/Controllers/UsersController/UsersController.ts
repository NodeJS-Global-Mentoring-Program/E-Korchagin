import { RequestHandler } from 'express';
import { UserService } from '../../Services';
import { FakeUserDataAccessModel } from '../../DataAccess';
import { CommonError } from '../CommonController';

export class UserController {
  private static userService = new UserService(FakeUserDataAccessModel);

  public static getUserById: RequestHandler = (req, res, next) => {
    const user = UserController.userService.getUserById(req.params.id);
    !user && res.status(404).json({ message: 'User not found' });

    res.json(user);
  };

  public static updateUser: RequestHandler = (req, res, next) => {
    const isUpdated = UserController.userService.updateUser(req.params.id, req.body);

    if (isUpdated) {
      res.sendStatus(200);
    } else {
      const err: CommonError = {
        Message: 'User was not delete',
        Status: 500
      };

      next(err);
    }
  }

  public static deleteUser: RequestHandler = (req, res, next) => {
    const isDeleted = UserController.userService.deleteUser(req.params.id);

    if (isDeleted) {
      res.sendStatus(200);
    } else {
      const err: CommonError = {
        Message: 'User was not delete',
        Status: 500
      };

      next(err);
    }
  }

  public static createNewUser: RequestHandler = (req, res, next) => {
    const newUserId = UserController.userService.createUser(req.body);
    res.json(newUserId);
  }

  public static getUsersByQuery: RequestHandler = (req, res, next) => {
    res.json(UserController.userService.getUsersBySubstring(req.query.substring as string, req.query.limit as string));
  }
}
