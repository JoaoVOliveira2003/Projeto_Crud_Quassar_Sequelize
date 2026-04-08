import { UsuarioQuery } from "../schema/usuario-schema.ts";
import { EnderecoQuery} from "../schema/endereco-schema.ts";
import {validarGenerico} from "./validarCampos"

export async function salvarUsuario(
    usuario,
    usuario_query: UsuarioQuery = new UsuarioQuery(),
    endereco_query: EnderecoQuery = new EnderecoQuery()
) {
    const usuario_salvo = await usuario_query.criarUsuario(usuario);
    const endereco = usuario.endereco;

const resultado = validarGenerico(usuario);


if (resultado !== true) {
  throw new Error(resultado.join(' | '));
}
    // if(usuario_salvo.nome === 'teste'){
    //     throw new Error('Não pode cadastrar usuario com o nome de "Teste" por favor utilize outro termo')
    // }
 
    endereco.id_usuario = usuario_salvo.id
    usuario_salvo.endereco = await endereco_query.criarEndereco(endereco);
    
    return usuario_salvo
}