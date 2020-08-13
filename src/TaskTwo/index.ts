import express from 'express';
import { PORT } from './config';
import { userRouter } from './Routers/User.router';

const app = express();

app.use(express.json());
app.listen(PORT);
app.use("/users", userRouter)
