import { Request, Response } from "express";
import { getTodosUsuarios } from "../services/usuario-get-service";
import { salvarUsuario } from "../services/usuario-salvar-service";
import { deletarUsuarioService } from "../services/usuario-deletar-service";
import { atualizarUsuarioService } from "../services/usuario-atualizar-service";
import { getTodosUsuariosFiltrados } from "../services/usuario-get-filtrado-service";
import { getVerificarTipoUsuario } from "../services/usuario-get-verificar-tipo-service";
import jwt from "jsonwebtoken";

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

  export async function gravarUsuario(req: Request, res: Response) {
    try {
      let usuario = req.body.usuario;
      const token = req.cookies?.token;

      let id_usuario = 0;
      if (token) {
        try {
          const decoded = jwt.verify(token, "segredoSecreto") as {
            id_usuario: number;
          };
          id_usuario = decoded.id_usuario ?? 0;
        } catch {
          id_usuario = 0;
        }
      }

      usuario = { ...usuario, criadoPor: id_usuario };

      const retorno = await salvarUsuario(usuario);
      res.json(retorno.toJSON());
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        erro: "Erro ao criar usuário com endereço",
        detalhes: error.message,
      });
    }
  }

  export async function deletarUsuario(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
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
      const id = Number(req.params.id);
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

  export async function getUsuariosFiltrado(req: Request, res: Response) {
    try {
      let filtros = req.query;
      filtros = Object.assign({}, filtros);
      const retorno = await getTodosUsuariosFiltrados(filtros);
      res.json(retorno);
    } catch (error: any) {
      res.status(500).json({
        erro: "Erro ao trazer usuários filtrado",
        detalhes: error.message,
      });
    }
  }

  export async function verificarTipoUsuario(req: Request, res: Response) {
    try {
      let id_usuario = req.body.id_usuario;
      let id_tipo_usuario = req.body.id_tipo_usuario;
      const retorno = await getVerificarTipoUsuario(id_usuario,id_tipo_usuario,);
      res.json(retorno);
    } catch (error: any) {
      res.status(500).json({
        erro: "Erro ao trazer usuários filtrado",
        detalhes: error.message,
      });
    }
  }

  export async function perfilCookie(req: Request, res: Response) {
    const id = req.usuario?.id_usuario;
    const tipo = req.usuario?.id_tipo_usuario;
    res.json({ id, tipo });
  }
}
