//quando se chama um service apartir de um middleware precisa fazer essa verificação !
import { UsuarioQuery } from "../schema/usuario-schema";

export async function getVerificarTipoUsuario(
  dados: {
    id_usuario: number;
    id_tipo_usuario: number;
  },
  usuario_query: UsuarioQuery = new UsuarioQuery(),
) {
  return usuario_query.verificarTipoUsuario(
    dados.id_usuario,
    dados.id_tipo_usuario,
  );
}
