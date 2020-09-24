import { Router } from 'express';
import { logMiddleware } from '../../Middlewares';
import { CommonController } from './CommonController';

export const loginRouter = Router({ caseSensitive: true });
loginRouter.post('/login', logMiddleware, CommonController.login);
loginRouter.post('/token', logMiddleware, CommonController.refreshToken);

