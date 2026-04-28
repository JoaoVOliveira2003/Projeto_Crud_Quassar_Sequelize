import { Request, Response } from "express";
import { comprovarLogin } from "../services/login-service";

export namespace loginController {
  export async function testarLogin(_req: Request, res: Response) {
    const login = _req.body.usuario;
    const usuario = await comprovarLogin(login);

    if (!usuario) {
      return res.status(401).json({ erro: "Senha ou email incorretos" });
    }

    // return res.json({ token });

    return res.cookie('token',usuario,{
      httpOnly:true,
      // secure: true,
      // sameSite:'none',     
      secure: false,        
      sameSite: 'lax',
      maxAge:60 * 60 * 1000
    }).sendStatus(200);
  }
}
