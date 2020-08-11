import express from 'express';
import { PORT } from './config';
import { useUsersRoute } from './Routers/User.router';

const app = express();

app.use(express.json());
app.listen(PORT);

useUsersRoute(app);
