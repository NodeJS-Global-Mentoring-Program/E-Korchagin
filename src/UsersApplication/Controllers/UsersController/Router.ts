import { Router } from 'express';
import { getValidationMiddleWare, newUserDataSchema, userUpdateDataSchema, ValidateLimitMiddleWare, ValidateUserIdMiddleWare } from './Validations';
import { UserController } from './UsersController';
import { logMiddleware } from '../../Middlewares';

export const userRouter = Router({ caseSensitive: true });

userRouter.route('/')
  .get(logMiddleware, ValidateLimitMiddleWare, UserController.getUsersByQuery)
  .post(logMiddleware, getValidationMiddleWare(newUserDataSchema), UserController.createNewUser);

userRouter.param('id', ValidateUserIdMiddleWare);
userRouter.route('/:id')
  .get(logMiddleware, UserController.getUserById)
  .put(logMiddleware, getValidationMiddleWare(userUpdateDataSchema), UserController.updateUser)
  .delete(logMiddleware, UserController.deleteUser);
