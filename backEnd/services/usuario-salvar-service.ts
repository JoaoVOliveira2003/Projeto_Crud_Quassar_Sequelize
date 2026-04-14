import { UsuarioQuery } from "../schema/usuario-schema.ts";
import { EnderecoQuery} from "../schema/endereco-schema.ts";
import { LoginQuery } from "../schema/login-schema.ts";
import {validarGenerico} from "./validarCampos"
import {DadosUsuario} from "../interfaces/usuarioInterface.ts"

export async function salvarUsuario(
    usuario: DadosUsuario,
    usuario_query: UsuarioQuery = new UsuarioQuery(),
    endereco_query: EnderecoQuery = new EnderecoQuery(),
    login_query: LoginQuery = new LoginQuery()
) {

    const resultado = validarGenerico(usuario);
    if (resultado !== true) {
        throw new Error(resultado.join(' | '));
    }

    const usuario_salvo = await usuario_query.criarUsuario(usuario);
    
    const usuarioObj = usuario_salvo as any; 
    
    const endereco = usuario.endereco;
    endereco.id_usuario = usuarioObj.id; 
    
    usuarioObj.endereco = await endereco_query.criarEndereco(endereco);
    
    const login = usuario.login;
    login.id_usuario = usuarioObj.id; 
        console.log('-------------')
    console.log(login)
    console.log('-------------')
    usuarioObj.login = await login_query.criarLogin(login);

    return usuarioObj;
}
