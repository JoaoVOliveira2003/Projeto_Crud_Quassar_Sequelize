import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";

export const routerUsuarios = Router();


routerUsuarios.get("", async (req, res) => await usuarioController.getUsuarios(req, res));

routerUsuarios.post("/criarUsuario/",async (req, res) => await usuarioController.gravarUsuario(req, res));

routerUsuarios.delete("/deletarUsuario/:id",async (req,res)=> await usuarioController.deletarUsuario(req,res));

routerUsuarios.put('/atualizarUsuario/:id',async(req,res)=> await usuarioController.atualizarUsuario(req,res));

export default routerUsuarios;