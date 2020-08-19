import { Router } from 'express';
import { getValidationMiddleWare, newUserDataSchema, userUpdateDataSchema, ValidateLimitMiddleWare, ValidateUserIdMiddleWare } from './Validations';
import { UserController } from './UsersController';

export const userRouter = Router({ caseSensitive: true });

userRouter.route('/')
  .get(ValidateLimitMiddleWare, UserController.getUsersByQuery)
  .post(getValidationMiddleWare(newUserDataSchema), UserController.createNewUser);

userRouter.param('id', ValidateUserIdMiddleWare);
userRouter.route('/:id')
  .get(UserController.getUserById)
  .put(getValidationMiddleWare(userUpdateDataSchema), UserController.updateUser)
  .delete(UserController.deleteUser);
