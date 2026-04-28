import {Router} from "express";
import {loginController} from "../controllers/loginController";

export const routerLogin = Router();

routerLogin.post("/realizarLogin/",async(req,res)=>await loginController.testarLogin(req,res));