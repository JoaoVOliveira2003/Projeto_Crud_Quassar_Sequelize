import { regras } from './regras'

type listaErros = string[]

type Obj = Record<string, unknown>

export function validarObjeto(objeto: unknown): listaErros {
  const erros: listaErros = []

  function percorrer(obj: unknown, caminho: string[] = []) {
    if (typeof obj !== 'object' || obj === null) return

    const o = obj as Obj

    for (const chave of Object.keys(o)) {
      const valor = o[chave]
      const caminhoCompleto = [...caminho, chave]

      if (
        valor !== null &&
        typeof valor === 'object' &&
        !Array.isArray(valor)
      ) {
        percorrer(valor, caminhoCompleto)
        continue
      }

      // 🔥 SEM ANY (ESLINT OK)
      const regrasDoCampo = (regras as Obj)[chave] as
        | Array<(v: unknown, o?: unknown) => true | string>
        | undefined

      if (regrasDoCampo) {
        for (const regra of regrasDoCampo) {
          const resultado =
            regra.length === 2
              ? regra(valor, objeto)
              : regra(valor)

          if (resultado !== true) {
            erros.push(`${caminhoCompleto.join('.')} → ${resultado}`)
            break
          }
        }
      }
    }
  }

  percorrer(objeto)

  return erros
}