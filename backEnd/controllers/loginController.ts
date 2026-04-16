import {Request,Response} from "express";
import {comprovarLogin } from "../services/login-service" ;

export namespace loginController{
    export async function testarLogin(_req:Request,res:Response){
        
        const login = _req.body.usuario;
        const token = await comprovarLogin(login);

        if(!token){
            return res.status(401).json({erro:"Senha ou email incorretos"});
        }

        return res.json({token});
    }
}