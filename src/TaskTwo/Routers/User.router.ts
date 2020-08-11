import { Router, Express } from 'express';
import { UserService } from '../Services/Users.service';

const router = Router();
const userService = UserService.instance;

export const useUsersRoute = (app: Express) => app.use("/users", router);

router.get("/:id", (req, res, next) => {
  const userId = req.params.id;
  const user = userService.getUserBuId(userId);

  user && res.send(user);
  res.sendStatus(404);
})