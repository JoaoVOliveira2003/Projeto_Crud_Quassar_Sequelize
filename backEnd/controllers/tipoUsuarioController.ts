import { Request, Response } from "express";
import { getTodosTiposUsuario } from "../services/tipoUsuario-get-service";

export namespace tipoUsarioController {
  export async function getTiposUsuario(_req: Request, res: Response) {
    try {
      const tipoUsuario = await getTodosTiposUsuario();
      res.json(tipoUsuario);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ erro: error.message });
    }
  }
}
