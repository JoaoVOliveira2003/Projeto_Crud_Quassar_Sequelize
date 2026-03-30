import { Request, Response } from "express";
import { getTodosUsuarios } from "../services/usuarioService";

/*
  export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await getTodosUsuarios();
    res.json(usuarios);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ erro: error.message });
  }
};
*/

export namespace usuarioController {
  export async function getUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await getTodosUsuarios();
      res.json(usuarios);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ erro: error.message });
    }
  }
}

// export async function name(params:type) {     }
