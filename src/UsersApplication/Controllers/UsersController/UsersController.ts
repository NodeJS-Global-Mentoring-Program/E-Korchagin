import { RequestParamHandler, RequestHandler } from 'express';
import { UserService } from '../../Services';
import { FakeUserDataAccessModel } from '../../DataAccess';
import { validateUserId } from './Validations';

export class UserController {
  private static userService = new UserService(FakeUserDataAccessModel);

  public static getUserByIdParam: RequestParamHandler = (req, res, next, id) => {
    const error = validateUserId(id).error;
    error && res.status(400).json(error.details.map(e => e.message));

    const user = UserController.userService.getUserById(id);
    !user && res.status(404).json({ message: 'User not found' });

    req.user = user;
    next();
  }

  public static getUserById: RequestHandler = (req, res, next) => res.json(req.user);

  public static updateUser: RequestHandler = (req, res, next) => { // Добавить тип параметров
    const isUpdated = UserController.userService.updateUser(req.params.id, req.body);

    if (isUpdated) {
      res.sendStatus(200);
    } else {
      res.status(500);
      next('Somethins bad happens');
    }
  }

  public static deleteUser: RequestHandler = (req, res, next) => {
    UserController.userService.deleteUser(req.params.id);
    res.sendStatus(200);
  }

  public static getUsersByQuery: RequestHandler = (req, res, next) => {
    const limit = req.query.limit;
    res.json(UserController.userService.getUsersBySubstring(req.query.substring as string, limit as string));
    next();
  }

  public static createNewUser: RequestHandler = (req, res, next) => {
    const newUserId = UserController.userService.createUser(req.body);
    res.json(newUserId);
  }
}
