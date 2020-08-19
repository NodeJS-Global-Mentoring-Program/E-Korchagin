import { Router } from 'express';
import { getValidationMiddleWare, newUserDataSchema, userUpdateDataSchema } from './Validations';
import { UserController } from './UsersController';

export const userRouter = Router({ caseSensitive: true });

userRouter.route('/')
  .get(UserController.getUsersByQuery)
  .post(getValidationMiddleWare(newUserDataSchema), UserController.getUsersByQuery);

userRouter.param('id', UserController.getUserByIdParam);
userRouter.route('/:id')
  .get(UserController.getUserById)
  .put(getValidationMiddleWare(userUpdateDataSchema), UserController.updateUser)
  .delete(UserController.deleteUser);
