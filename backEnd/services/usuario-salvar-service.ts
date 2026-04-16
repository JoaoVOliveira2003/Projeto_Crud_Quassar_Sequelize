import { UsuarioQuery } from "../schema/usuario-schema.ts";
import { EnderecoQuery} from "../schema/endereco-schema.ts";
import { LoginQuery } from "../schema/login-schema.ts";
import {validarGenerico} from "./validar-campos-service.ts"
import {DadosUsuario} from "../interfaces/usuarioInterface.ts"
import CryptoJS from "crypto-js";

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

    login.senha = CryptoJS.HmacSHA256(login.senha, process.env.CRYPTO_SECRET!).toString();

    login.id_usuario = usuarioObj.id; 

    usuarioObj.login = await login_query.criarLogin(login);

    return usuarioObj;
}
