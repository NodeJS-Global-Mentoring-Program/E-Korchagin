import { Router } from 'express';
import { getValidationMiddleWare, newGroupDataSchema, groupUpdateDataSchema, ValidateLimitMiddleWare, ValidateGroupIdMiddleWare } from './Validations';
import { GroupController } from './GroupsController';

export const groupRouter = Router({ caseSensitive: true });

groupRouter.route('/')
  .get(ValidateLimitMiddleWare, GroupController.getGroupsByQuery)
  .post(getValidationMiddleWare(newGroupDataSchema), GroupController.createNewGroup);

groupRouter.param('id', ValidateGroupIdMiddleWare);

groupRouter.route('/assign/:id')
  .put(GroupController.addUsersToGroup); // Другая валидация

groupRouter.route('/:id')
  .get(GroupController.getGroupById)
  .put(getValidationMiddleWare(groupUpdateDataSchema), GroupController.updateGroup)
  .delete(GroupController.deleteGroup);
