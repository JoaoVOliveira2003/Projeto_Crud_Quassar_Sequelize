import { UsuarioQuery } from "../schema/usuario-schema.ts";

export async function getTodosUsuarios(usuario_query: UsuarioQuery = new UsuarioQuery()) {
  const usuarios = await usuario_query.getUsuarios();
  return usuarios;
}