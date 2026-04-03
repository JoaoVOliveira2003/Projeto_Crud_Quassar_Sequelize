import {Router} from "express";
import {cidadeController} from "../controllers/cidadeController";

export const routerCidades = Router();

routerCidades.get("", async (req, res) => await cidadeController.getCidades(req, res))

export default routerCidades;