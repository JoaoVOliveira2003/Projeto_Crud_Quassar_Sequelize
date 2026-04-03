import { Request, Response } from "express";
import { getTodosUsuarios } from "../services/usuarioService";
import { salvarUsuario } from "../services/usuario-salvar-service";
import { deletarUsuarioService } from "../services/usuario-deletar-service";
import { atualizarUsuarioService } from "../services/usuario-atualizar-service";

export namespace usuarioController {
  export async function getUsuarios(req: Request, res: Response) {
    try {
      // const id_usuario = req?.params?.id ?? -1
      const usuarios = await getTodosUsuarios();
      res.json(usuarios);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ erro: error.message });
    }
  }

  export async function gravarUsuario(req: Request, res: Response) {
    try {
      const usuario = req.body.usuario;
      const retorno = await salvarUsuario(usuario);
      res.json(retorno.toJSON());
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          erro: "Erro ao criar usuário com endereço",
          detalhes: error.message,
        });
    }
  }

  export async function deletarUsuario(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const retorno = await deletarUsuarioService(id);

      res.json(retorno);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        erro: "Erro ao deletar usuário e endereço",
        detalhes: error.message,
      });
    }
  }

  export async function atualizarUsuario(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const usuario = req.body.usuario;

      const retorno = await atualizarUsuarioService(id, usuario);
      res.json(retorno);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        erro: "Erro ao atualizar usuário e endereço",
        detalhes: error.message,
      });
    }
  }
}
