import express from 'express';
import { usersApiPrefix, userRouter, CommonController } from './Controllers';
import { PORT } from './config';

const app = express();

app.use(express.json());
app.use(usersApiPrefix, userRouter);
app.use(CommonController.handleCommonError);

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));
