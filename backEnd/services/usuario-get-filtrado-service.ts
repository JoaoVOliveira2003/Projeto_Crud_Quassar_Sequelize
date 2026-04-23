import { UsuarioQuery } from "../schema/usuario-schema";
import { formularioPesquisaInterface } from "../interfaces/formularioPesquisaInterface";

export async function getTodosUsuariosFiltrados(
  filtros: formularioPesquisaInterface,
  usuario_query: UsuarioQuery = new UsuarioQuery(),
) {
  const usuarios = await usuario_query.getUsuariosFiltrados(filtros);
  return usuarios;
}
