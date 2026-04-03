import { UsuarioQuery } from "../schema/usuario-schema.ts";
import { EnderecoQuery} from "../schema/endereco-schema.ts";

export async function salvarUsuario(
    usuario,
    usuario_query: UsuarioQuery = new UsuarioQuery(),
    endereco_query: EnderecoQuery = new EnderecoQuery()
) {
    const usuario_salvo = await usuario_query.criarUsuario(usuario);
    const endereco = usuario.endereco
    endereco.id_usuario = usuario_salvo.id
    usuario_salvo.endereco = await endereco_query.criarEndereco(endereco);
    
    return usuario_salvo
}