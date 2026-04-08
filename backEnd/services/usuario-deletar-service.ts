import {UsuarioQuery} from "../schema/usuario-schema";
import {EnderecoQuery} from "../schema/endereco-schema";

export async function deletarUsuarioService(
    id  : number,
    usuario_query: UsuarioQuery = new UsuarioQuery(),
    endereco_query: EnderecoQuery = new EnderecoQuery()
) {
    await endereco_query.deletarEndereco(id);
    await usuario_query.deletarUsuario(id);
    return { mensagem: "Usuário deletado com sucesso" };

}