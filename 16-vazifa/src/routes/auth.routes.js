// BU QATORLARNI FAYLNING BOSIGA QO'SHING
import { Router } from 'express';
import authController from "../controllers/auth.controller.js";


const authrouter = Router();


authrouter.post("/register",authController.register);
authrouter.post("/login",authController.login);


export default authrouter;