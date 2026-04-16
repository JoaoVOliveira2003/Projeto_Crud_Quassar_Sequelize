import { LoginQuery } from "../schema/login-schema";
import { loginInterface } from "../interfaces/loginInterface";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

export async function comprovarLogin(
  login: loginInterface,
  login_query: LoginQuery = new LoginQuery(),
) {

  login.senha = CryptoJS.HmacSHA256(login.senha, process.env.CRYPTO_SECRET!).toString();  
  
  const resultado = await login_query.realizarLogin(login);

  if (resultado.length === 0) {
    return null;
  }

  const usuario = resultado[0];

  const token = jwt.sign(
    {
      id_usuario: (usuario as any).id_usuario,
    },
    "segredoSecreto",
    {
      expiresIn: "5h",
    },
  );

  return token;
}
