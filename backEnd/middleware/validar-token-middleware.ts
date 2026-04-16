import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const validarTokenObrigatorioMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensagem: "Token não informado" });
  }

  try {
    jwt.verify(token, "segredoSecreto");
    next();
  } catch {
    return res.status(401).json({ mensagem: "Token inválido ou expirado" });
  }
};

export const validarTokenNaoObrigatorioMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return next();

  try {
    jwt.verify(token, "segredoSecreto");
  } catch {
    return res.status(401).json({ mensagem: "Token inválido ou expirado" });
  }

  return next();
};