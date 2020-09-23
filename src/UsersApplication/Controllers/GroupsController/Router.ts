import { Router } from 'express';
import { getValidationMiddleWare, newGroupDataSchema, groupUpdateDataSchema, ValidateLimitMiddleWare, ValidateGroupIdMiddleWare } from './Validations';
import { GroupController } from './GroupsController';
import { logMiddleware } from '../../Middlewares';

export const groupRouter = Router({ caseSensitive: true });

groupRouter.route('/')
  .get(logMiddleware, ValidateLimitMiddleWare, GroupController.getGroupsByQuery)
  .post(logMiddleware, getValidationMiddleWare(newGroupDataSchema), GroupController.createNewGroup);

groupRouter.param('id', ValidateGroupIdMiddleWare);

groupRouter.route('/assign/:id')
  .put(logMiddleware, GroupController.addUsersToGroup); // Другая валидация

groupRouter.route('/:id')
  .get(logMiddleware, GroupController.getGroupById)
  .put(logMiddleware, getValidationMiddleWare(groupUpdateDataSchema), GroupController.updateGroup)
  .delete(logMiddleware, GroupController.deleteGroup);
