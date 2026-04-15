import {Request,Response} from "express";
import {comprovarLogin } from "../services/loginService" ;

export namespace loginController{
    export async function testarLogin(_req:Request,res:Response){
        const login = _req.body.usuario;
        const resultado = await comprovarLogin(login);

        res.json(resultado);
    }
}