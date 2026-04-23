import { Request, Response, NextFunction } from "express";
import { regras } from "./regras-middleware";

type ListaDeErros = string[];
type ObjetoGenerico = Record<string, unknown>;

function validarObjeto(
  objetoDesconhecido: unknown,
  caminhoPercorrido: string[] = [],
): ListaDeErros {
  const errosEncontrados: ListaDeErros = [];

  if (typeof objetoDesconhecido !== "object" || objetoDesconhecido === null) {
    return errosEncontrados;
  }

  const objetoAtual = objetoDesconhecido as ObjetoGenerico;

  for (const chaveAtual of Object.keys(objetoAtual)) {
    const valorDaChave = objetoAtual[chaveAtual];
    const caminhoCompleto = [...caminhoPercorrido, chaveAtual];

    const ehObjetoAninhado =
      valorDaChave !== null &&
      typeof valorDaChave === "object" &&
      !Array.isArray(valorDaChave);

    if (ehObjetoAninhado) {
      const errosAninhados = validarObjeto(valorDaChave, caminhoCompleto);
      errosEncontrados.push(...errosAninhados);
      continue;
    }

    const regrasDoCampo = (regras as ObjetoGenerico)[chaveAtual] as
      | Array<(valorParam: unknown) => true | string>
      | undefined;

    if (regrasDoCampo) {
      for (const regraAtual of regrasDoCampo) {
        const resultado = regraAtual(valorDaChave);
        if (resultado !== true) {
          errosEncontrados.push(`${caminhoCompleto.join(".")} → ${resultado}`);
          break; // para no primeiro erro do campo, igual ao front
        }
      }
    }
  }

  return errosEncontrados;
}

export function validarBody(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const erros = validarObjeto(req.body);

  if (erros.length > 0) {
    res.status(400).json({ sucesso: false, erros });
    return;
  }

  next();
}
