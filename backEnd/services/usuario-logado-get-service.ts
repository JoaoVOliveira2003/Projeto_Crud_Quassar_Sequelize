import jwt from "jsonwebtoken";

interface JwtPayload {
  id_usuario: number;
  id_tipo_usuario: number;
  exp: number;
}

export function getDadosUsuarioLogado(req: any) {
  const token = req.cookies?.token;

  if (!token) {
    throw new Error("Não autenticado");
  }

  try {
    const decoded = jwt.verify(token, "segredoSecreto") as JwtPayload;

    return {
      id_usuario: decoded.id_usuario,
      id_tipo_usuario: decoded.id_tipo_usuario,
      exp: decoded.exp,
      tempo_restante: decoded.exp - Math.floor(Date.now() / 1000)
    };

  } catch (err) {
    throw new Error("Token inválido ou expirado");
  }
}