import { TipoUsuarioQuery } from "../schema/tipoUsuario-schema";

export async function getTodosTiposUsuario(
  tipoUsuarioQuery = new TipoUsuarioQuery(),
) {
  const tipoUsuario = await tipoUsuarioQuery.getTodosTiposUsuario();
  return tipoUsuario;
}
