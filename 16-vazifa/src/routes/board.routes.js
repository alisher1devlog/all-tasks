import { Router } from "express";
import boardController from "../controllers/board.controller.js";

const boardRouter = Router();

boardRouter.get("/boards",boardController.getAllBoards);
boardRouter.get("/boards/:boardId",boardController.getById);
boardRouter.post("/boards",boardController.createBoard);
boardRouter.put("/boards/:boardId",boardController.updateBoard)
boardRouter.delete("/boards/:boardId",boardController.deleteBoard);


export default boardRouter;