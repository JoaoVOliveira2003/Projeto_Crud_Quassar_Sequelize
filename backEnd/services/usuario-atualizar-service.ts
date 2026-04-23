import { UsuarioQuery } from "../schema/usuario-schema";
import { EnderecoQuery } from "../schema/endereco-schema";
import { LoginQuery } from "../schema/login-schema";
import { validarGenerico } from "./validar-campos-service";
import { DadosUsuario } from "../interfaces/usuarioInterface";
import CryptoJS from "crypto-js";

export async function atualizarUsuarioService(
  id: number,
  usuario: DadosUsuario,
  usuario_query: UsuarioQuery = new UsuarioQuery(),
  endereco_query: EnderecoQuery = new EnderecoQuery(),
  login_query: LoginQuery = new LoginQuery(),
) {
  const resultado = validarGenerico(usuario);

  if (resultado !== true) {
    throw new Error(resultado.join(", "));
  }

  if (usuario.login.senha) {
    usuario.login.senha = CryptoJS.HmacSHA256(
      usuario.login.senha,
      process.env.CRYPTO_SECRET!,
    ).toString();
  }

  await endereco_query.atualizarEndereco(id, usuario.endereco);
  await usuario_query.atualizarUsuario(id, usuario);
  await login_query.atualizarLogin(id, usuario.login);

  return {
    mensagem: "Usuario e endereco atualizado",
  };
}
