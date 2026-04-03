import { UsuarioQuery } from "../schema/usuario-schema";
import { EnderecoQuery } from "../schema/endereco-schema";

export async function atualizarUsuarioService(
        id,
        usuario,
        usuario_query: UsuarioQuery = new UsuarioQuery(),
        endereco_query: EnderecoQuery = new EnderecoQuery()
){
    await endereco_query.atualizarEndereco(id, usuario.endereco);
    await usuario_query.atualizarUsuario(id,usuario);
    return {mensagem: "Usuaio e endereco atualizado"};
}