import { Router } from "express";
import { usuarioLogadoController } from "../controllers/usuarioLogadoController";

import {validarTokenObrigatorioMiddleware} from '../middleware/validar-token-middleware'
export const routerUsuarioLogado = Router();
routerUsuarioLogado.use(validarTokenObrigatorioMiddleware);

routerUsuarioLogado.get("/getUsuarioLogado/",async (req,res)=> await usuarioLogadoController.getUsuarioLogado(req,res));

export default routerUsuarioLogado;