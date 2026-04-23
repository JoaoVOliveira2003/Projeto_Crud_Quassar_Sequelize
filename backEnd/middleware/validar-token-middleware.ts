import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getVerificarTipoUsuario } from "../services/usuario-get-verificar-tipo-service";

const SEGREDO = "segredoSecreto";

declare global {
  namespace Express {
    interface Request {
      usuario?: jwt.JwtPayload;
    }
  }
}

const validarTipoUsuario = async (
  id_usuario: number,
  id_tipo_usuario: number,
): Promise<boolean> => {
  try {
    const resultado = await getVerificarTipoUsuario({
      id_usuario,
      id_tipo_usuario,
    });

    return !!resultado;
  } catch {
    return false;
  }
};

export const validarTokenObrigatorioMiddleware = async (
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

    const tipoValido = await validarTipoUsuario(
      payload.id_usuario,
      payload.id_tipo_usuario,
    );

    if (!tipoValido) {
      return res.status(401).json({ message: "Não autorizado" });
    }

    return next();
  } catch {
    return res.status(401).json({ mensagem: "Token inválido ou expirado" });
  }
};

export const validarTokenNaoObrigatorioMiddleware = async (
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

    const tipoValido = await validarTipoUsuario(
      payload.id_usuario,
      payload.id_tipo_usuario,
    );

    if (!tipoValido) {
      return res.redirect("/login");
    }

    return next();
  } catch {
    return res.status(401).json({ mensagem: "Token inválido ou expirado" });
  }
};

const renovarToken = (payload: jwt.JwtPayload, res: Response) => {
  const agora = Math.floor(Date.now() / 1000);

  if (payload.exp && payload.exp > agora) {
    return;
  }

  const { iat, exp, ...dadosUsuario } = payload;

  const novoToken = jwt.sign(dadosUsuario, SEGREDO, {
    expiresIn: "10s",
  });

  res.setHeader("Authorization", `Bearer ${novoToken}`);
};
