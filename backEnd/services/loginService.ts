import { LoginQuery } from "../schema/login-schema";
import { loginInterface } from "../interfaces/loginInterface";
import jwt from "jsonwebtoken";

export async function comprovarLogin(
  login: loginInterface,
  login_query: LoginQuery = new LoginQuery(),
) {
  const resultado = await login_query.realizarLogin(login);

  if (resultado.length === 0) {
    return null;
  }

  const usuario = resultado[0];

  const token = jwt.sign(
    {
      id_usuario: usuario.id_usuario,
    },
    "segredoSecreto",
    {
      expiresIn: "1h",
    },
  );

  return token;
  
}

// const usuario = await login_query.realizarLogin(login);
// if(!usuario){
//     throw new Error("Usuario ou senha errados");
// }
// console.log(usuario);
// const token = jwt.sign({id:usuario.id_usuario},process.env.JWT_SECRET as string,{expiresIn: "1h"});
// return {usuario,token}
