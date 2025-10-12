import {Router} from "express"
import userController from "../controllers/user.controller.js";


const userRouter = Router();


userRouter.get("/users",userController.getAll);
userRouter.get("/users/:userId",userController.getById);
userRouter.put("/users/:userId",userController.update);
userRouter.delete("/users/:userId",userController.delete);


export default userRouter;