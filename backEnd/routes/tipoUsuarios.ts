import {Router} from "express";
import {tipoUsarioController} from "../controllers/tipoUsuarioController";

export const routerTipoUsuarios = Router();

routerTipoUsuarios.get("",async(req,res)=>await tipoUsarioController.getTiposUsuario(req,res));

export default routerTipoUsuarios;