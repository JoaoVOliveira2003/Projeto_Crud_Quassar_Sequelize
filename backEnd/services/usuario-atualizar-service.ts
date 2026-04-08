import { UsuarioQuery } from "../schema/usuario-schema";
import { EnderecoQuery } from "../schema/endereco-schema";
import {validarGenerico} from "./validarCampos"

export async function atualizarUsuarioService(
        id,
        usuario,
        usuario_query: UsuarioQuery = new UsuarioQuery(),
        endereco_query: EnderecoQuery = new EnderecoQuery()
){

    const resultado = validarGenerico(usuario);
    if (resultado !== true) {
      throw new Error(resultado);
    }

    await endereco_query.atualizarEndereco(id, usuario.endereco);
    await usuario_query.atualizarUsuario(id,usuario);
    
    return {
        mensagem: "Usuario e endereco atualizado"
    };
}