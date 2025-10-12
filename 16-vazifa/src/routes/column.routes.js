import { Router } from "express";
import columnController from "../controllers/column.controller.js";

const columnRouter = Router();

columnRouter.get("/boards/:boardId/columns",columnController.getAllColumn);
columnRouter.post("/boards/:boardId/columns",columnController.createColumn);
columnRouter.get("/boards/:boardId/columns/:columnId",columnController.getColumnById);
columnRouter.put("/boards/:boardId/columns/:columnId",columnController.updateColumn);
columnRouter.delete("/boards/:boardId/columns/:columnId",columnController.deleteColumn);



export default columnRouter;