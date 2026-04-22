import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SEGREDO = "segredoSecreto";

declare global {
  namespace Express {
    interface Request {
      usuario?: jwt.JwtPayload;
    }
  }
}

export const validarTokenObrigatorioMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensagem: "Token não informado" });
  }

  try {
    const payload = jwt.verify(token, SEGREDO, {
      ignoreExpiration: true,
    }) as jwt.JwtPayload;
    req.usuario = payload;
    renovarToken(payload, res);
    next();
  } catch {
    return res.status(401).json({ mensagem: "Token inválido ou expirado" });
  }
};

export const validarTokenNaoObrigatorioMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return next();

  try {
    const payload = jwt.verify(token, SEGREDO, {
      ignoreExpiration: true,
    }) as jwt.JwtPayload;
    req.usuario = payload;
    renovarToken(payload, res);
  } catch {
    return res.status(401).json({ mensagem: "Token inválido ou expirado" });
  }

  return next();
};

const renovarToken = (payload: jwt.JwtPayload, res: Response) => {
  
  const agora = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp > agora){
    return;
  } 

  const { iat, exp, ...dadosUsuario } = payload;
  const novoToken = jwt.sign(dadosUsuario, SEGREDO, { expiresIn: "10s" });
  res.setHeader("Authorization", `Bearer ${novoToken}`);
};