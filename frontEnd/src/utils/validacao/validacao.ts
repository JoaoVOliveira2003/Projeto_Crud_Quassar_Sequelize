import { regras } from './regras';

type ListaDeErros = string[];
type ObjetoGenerico = Record<string, unknown>;

export function validarObjeto(objetoDesconhecido: unknown,caminhoPercorrido: string[] = []): ListaDeErros {
  const errosEncontrados: ListaDeErros = [];

  if (typeof objetoDesconhecido !== 'object' || objetoDesconhecido === null) {
    return errosEncontrados;
  }

  const objetoAtual = objetoDesconhecido as ObjetoGenerico;

  for (const chaveAtual of Object.keys(objetoAtual)) {
    const valorDaChave = objetoAtual[chaveAtual];
    const caminhoCompleto = [...caminhoPercorrido, chaveAtual];

    const objetoNaoArray = valorDaChave !== null && typeof valorDaChave === 'object' && !Array.isArray(valorDaChave);

    if (objetoNaoArray) {
      // Recursão para objetos aninhados
      const errosAninhados = validarObjeto(valorDaChave, caminhoCompleto);
      errosEncontrados.push(...errosAninhados);
      continue;
    }

    // Verificar regras do campo
    const regrasDoCampo = (regras as ObjetoGenerico)[chaveAtual] as
      | Array<(valorParam: unknown, objetoOriginal?: unknown) => true | string>
      | undefined;

    if (regrasDoCampo) {
      
      for (const regraAtual of regrasDoCampo) {const resultadoValidacao = regraAtual(valorDaChave);
        if (resultadoValidacao !== true) {
          const mensagemErro = `${caminhoCompleto.join('.')} → ${resultadoValidacao}`;
          errosEncontrados.push(mensagemErro);
          break;
        }
      }
    }
  }

  return errosEncontrados;
}


/*
================================================================================
of em um for significa "para cada elemento dentro de"
as em uma atribuição, fala para o sistema tratar esse valor como tal objeto, em valor as ObjetoGenerico, eu falo "analise esse valor como o objeto generico"
================================================================================

type ObjetoGenerico = Record<string, unknown>
"ObjetoGenerico é um objeto onde todas as chaves são strings e os valores podem ser qualquer coisa (unknown)”

export function validarObjeto(objetoDesconhecido: unknown): ListaDeErros {
// Em type script o que vem depois dos dois pontos significa o retorno dessa função.

if (typeof valorAtual !== 'object' || valorAtual === null) return
// vai embora se o valorAtual n for um objeto ou null

const objetoAtual = valorAtual as ObjetoGenerico
// objetoAtual recebe o mesmo valor de valorAtual, mas agora tipado como ObjetoGenerico

for (const chaveAtual of Object.keys(objetoAtual)) {
// Para cada chave dentro do objeto objetoAtual

const caminhoCompleto = [...caminhoPercorrido, chaveAtual]
// Cria um novo array com tudo que já estava em caminhoPercorrido + a chaveAtual no final

const regrasDoCampo = (regras as ObjetoGenerico)[chaveAtual] as
| Array<(valorParam: unknown, objetoOriginal?: unknown) => true | string>
| undefined
// Pega dentro de regras o valor da chave atual, tratando como um objeto,
// e considera que isso é um array de regras ou pode não existir


| → TypeScript (tipos) → “OU de tipos”
|| → JavaScript (execução) → “OU lógico”

const regrasDoCampo =
  (regras as ObjetoGenerico)[chaveAtual] as
  | Array<(valorParam: unknown, objetoOriginal?: unknown) => true | string>
  | undefined

isso é uma maneira mais "cool" de se escrever

veja dentro desse array se tem uma regra para essa variavel!
================================================================================
*/
