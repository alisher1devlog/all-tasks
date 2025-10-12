import { Router } from "express";
import taskController from "../controllers/task.controller.js";


const taskRouter = Router();

taskRouter.get("/boards/:boardId/tasks",taskController.getAllTasks);
taskRouter.post("/boards/:boardId/tasks",taskController.createTask);
taskRouter.get("/boards/:boardId/tasks/:taskId",taskController.getTaskById);
taskRouter.put("/boards/:boardId/tasks/:taskId",taskController.updateTask);
taskRouter.delete("/boards/:boardId/tasks/:taskId",taskController.deleteTask);

export default taskRouter;