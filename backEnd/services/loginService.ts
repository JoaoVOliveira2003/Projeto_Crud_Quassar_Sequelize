import { LoginQuery } from "../schema/login-schema";
import {loginInterface} from '../interfaces/loginInterface'
import jwt from 'jsonwebtoken';

export async function comprovarLogin(
    login:loginInterface,
    login_query: LoginQuery = new LoginQuery(),
)
{
const resultado = await login_query.realizarLogin(login);

if(resultado.length === 0){
    return 0;
}

return 1;
}

// const usuario = await login_query.realizarLogin(login);
// if(!usuario){
//     throw new Error("Usuario ou senha errados");
// }
// console.log(usuario);
// const token = jwt.sign({id:usuario.id_usuario},process.env.JWT_SECRET as string,{expiresIn: "1h"});
// return {usuario,token}