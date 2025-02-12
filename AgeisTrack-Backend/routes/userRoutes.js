import express from "express";
const userRouter = express.Router();
import { signup, signin , showUsers} from "../controllers/userController.js";
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/showusers", showUsers);
export default userRouter;
