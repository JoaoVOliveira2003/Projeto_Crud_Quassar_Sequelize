import { UsuarioQuery } from "../schema/Usuario.js";
import { Endereco } from "../schema/Endereco.js";


export async function getTodosUsuarios(
  usuario_query: UsuarioQuery = new UsuarioQuery()
) {
  const teste = await usuario_query.getUsuarios();
  return teste;
}

// export async function getUsuarios(usuario_query: UsuarioQuery = UsuarioQuery.getInstance()) {
//   const teste = usuario_query.getUsuarios()
//   return teste;
// }

  // return await Usuario.findAll({
  //   include: [{ model: Endereco }],
  //   order: [["id", "ASC"]],
  // });
