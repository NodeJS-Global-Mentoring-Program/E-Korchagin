import express from 'express';
import cors from 'cors';
import { usersApiPrefix, userRouter, groupsApiPrefix, groupRouter, CommonController } from './Controllers';
import { API_SERVER_PORT } from './config';
import { checkTokenMiddleware, logger } from './Middlewares';
import { loginRouter } from './Controllers/CommonController/Router';

const app = express();

app.use(express.json());

app.use(cors({
  origin: true,
  optionsSuccessStatus: 200
}));

app.use(loginRouter, checkTokenMiddleware);
app.use(usersApiPrefix, userRouter);
app.use(groupsApiPrefix, groupRouter);
app.use(CommonController.handleCommonError);

app.listen(API_SERVER_PORT, () => console.log(`Server Started at port ${API_SERVER_PORT}`));

process.on('uncaughtException', err => {
  logger.error(err);
});

process.on('unhandledRejection', event => {
  logger.error('unhandled Promise Rejection');
  process.exit();
});
