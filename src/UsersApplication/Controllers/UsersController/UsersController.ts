import { Router } from 'express';
import { UserService } from '../../Services/Users.service';
import { getValidationMiddleWare, newUserSchema, undateUserSchema } from './UserValidations';

export const userRouter = Router({ caseSensitive: true });
const userService = UserService.instance;

userRouter.route('/')
  .get((req, res, next) => {
    const limit = req.query.limit;
    res.json(userService.getUsersBySubstring(req.query.substring as string).slice(0, limit ? +limit : 5))
    next();
  })
  .post(getValidationMiddleWare(newUserSchema), (req, res, next) => {
    const newUserId = userService.createUser(req.body);
    res.json(newUserId);
  });

userRouter.param('id', (req, res, next, id) => {
  req.body.User = userService.getUserBuId(id);
  next();
});

userRouter.route('/:id')
  .get((req, res, next) => {
    req.body.User && res.json(req.body.User);
    res.status(404).json({ message: 'User not found' });
  })
  .put(getValidationMiddleWare(undateUserSchema), (req, res, next) => {
    const isUpdated = userService.updateUser(req.body);

    isUpdated
      ? res.sendStatus(200)
      : res.status(404).json({ message: 'User not found' });
  })
  .delete((req, res, next) => {
    userService.deleteUser(req.params.id);
    res.sendStatus(200);
  });
