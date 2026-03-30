import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";

export const routerUsuarios = Router();

routerUsuarios.get("", usuarioController.getUsuarios);

export default routerUsuarios;

// import { Router } from "express";
// import { usuarioController } from "../controllers/usuarioController";
// export const routerUsuarios = Router();
// routerUsuarios.get("/getUsuarios", usuarioController.getUsuarios());
// export default routerUsuarios;
