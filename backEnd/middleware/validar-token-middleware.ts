import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getVerificarTipoUsuario } from "../services/usuario-get-verificar-tipo-service";

const SEGREDO = "segredoSecreto";
const EXPIRACAO_TOKEN = "1h";
const RENOVAR_SE_MENOR_QUE = 5; // segundos

declare global {
  namespace Express {
    interface Request {
      usuario?: jwt.JwtPayload;
    }
  }
}

function extrairToken(req: Request): string | null {
  return req.cookies?.token ?? null;
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

const renovarTokenSeNecessario = (
  payload: jwt.JwtPayload,
  res: Response,
): void => {
  const agora = Math.floor(Date.now() / 1000);
  const deveRenovar =
    !payload.exp || payload.exp - agora < RENOVAR_SE_MENOR_QUE;

  if (!deveRenovar) return;

  const { iat, exp, ...dadosUsuario } = payload;
  const novoToken = jwt.sign(dadosUsuario, SEGREDO, {
    expiresIn: EXPIRACAO_TOKEN,
  });

  res.cookie("token", novoToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 1000,
  });
};

const verificarToken = (token: string): jwt.JwtPayload | null => {
  try {
    return jwt.verify(token, SEGREDO, {
      ignoreExpiration: true,
    }) as jwt.JwtPayload;
  } catch {
    return null;
  }
};

const tokenExpirado = (payload: jwt.JwtPayload): boolean => {
  const agora = Math.floor(Date.now() / 1000);
  return !!payload.exp && payload.exp <= agora;
};

export const validarTokenObrigatorioMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = extrairToken(req);

  if (!token) {
    return res.status(401).json({ mensagem: "Token não informado" });
  }

  const payload = verificarToken(token);

  if (!payload) {
    return res.status(401).json({ mensagem: "Token inválido" });
  }

  if (tokenExpirado(payload)) {
    return res.status(401).json({ mensagem: "Token expirado" });
  }

  req.usuario = payload;

  const tipoValido = await validarTipoUsuario(
    payload.id_usuario,
    payload.id_tipo_usuario,
  );
  if (!tipoValido) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  renovarTokenSeNecessario(payload, res);

  return next();
};

export const validarTokenNaoObrigatorioMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = extrairToken(req);

  if (!token) return next();

  const payload = verificarToken(token);

  if (!payload) {
    return res.status(401).json({ mensagem: "Token inválido" });
  }

  req.usuario = payload;

  const tipoValido = await validarTipoUsuario(
    payload.id_usuario,
    payload.id_tipo_usuario,
  );
  if (!tipoValido) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  return next();
};
