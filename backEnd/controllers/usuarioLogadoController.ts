import { Request, Response } from "express";
import { getDadosUsuarioLogado } from "../services/usuario-logado-get";

export namespace usuarioLogadoController {
  export async function getUsuarioLogado(req: Request, res: Response) {
    try {
      const usuario = getDadosUsuarioLogado(req);
      return res.json(usuario);
    } catch {
      return res.sendStatus(401);
    }
  }
}
