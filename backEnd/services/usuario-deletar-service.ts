import {UsuarioQuery} from "../schema/usuario-schema";
import {EnderecoQuery} from "../schema/endereco-schema";
import {LoginQuery} from "../schema/login-schema"

export async function deletarUsuarioService(
    id  : number,
    usuario_query: UsuarioQuery = new UsuarioQuery(),
    endereco_query: EnderecoQuery = new EnderecoQuery(),
    login_query: LoginQuery = new LoginQuery()
) {
    await endereco_query.deletarEndereco(id);
    await usuario_query.deletarUsuario(id);
    await login_query.deletarLogin(id);
    return { mensagem: "Usuário deletado com sucesso" };
}