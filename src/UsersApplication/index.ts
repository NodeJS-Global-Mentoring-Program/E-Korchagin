import express from 'express';
import { usersApiPrefix, userRouter, CommonController } from './Controllers';
import { API_SERVER_PORT } from './config';

const app = express();

app.use(express.json());
app.use(usersApiPrefix, userRouter);
app.use(CommonController.handleCommonError);

app.listen(API_SERVER_PORT, () => console.log(`Server Started at port ${API_SERVER_PORT}`));
