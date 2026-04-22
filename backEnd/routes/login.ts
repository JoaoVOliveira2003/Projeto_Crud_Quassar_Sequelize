import {Router} from "express";
import {loginController} from "../controllers/loginController";

export const routerLogin = Router();

routerLogin.post("/criarLogin/",async(req,res)=>await loginController.testarLogin(req,res));