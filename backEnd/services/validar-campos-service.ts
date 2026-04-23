export function validarGenerico(dados: any): true | string[] {
  const erros: string[] = [];

  function percorrer(obj: any, caminho: string[] = []) {
    for (const chave of Object.keys(obj)) {
      const valor = obj[chave];
      const caminhoCompleto = [...caminho, chave];

      if (
        valor !== null &&
        typeof valor === "object" &&
        !Array.isArray(valor)
      ) {
        percorrer(valor, caminhoCompleto);
        continue;
      }

      if (chave === "nome" && valor !== undefined && valor !== null) {
        if (typeof valor !== "string" || valor.length < 3) {
          erros.push(
            `${caminhoCompleto.join(".")} → Nome tem que ser maior que três.`,
          );
        }
      }

      if (
        chave === "dataDeNascimento" &&
        valor !== undefined &&
        valor !== null
      ) {
        if (!valor) {
          erros.push(`${caminhoCompleto.join(".")} → Data é obrigatória`);
        }
      }

      if (chave === "peso" && valor !== undefined && valor !== null) {
        if (isNaN(valor)) {
          erros.push(`${caminhoCompleto.join(".")} → Peso inválido`);
        } else if (typeof valor !== "number" || valor <= 0) {
          erros.push(
            `${caminhoCompleto.join(".")} → Peso deve ser maior que 0`,
          );
        }
      }

      if (chave === "altura" && valor !== undefined && valor !== null) {
        if (isNaN(valor)) {
          erros.push(`${caminhoCompleto.join(".")} → Altura inválida`);
        } else {
          if (valor <= 0) {
            erros.push(
              `${caminhoCompleto.join(".")} → Altura deve ser maior que 0`,
            );
          }
          if (valor >= 3) {
            erros.push(`${caminhoCompleto.join(".")} → Altura inválida`);
          }
        }
      }

      if (chave === "rua" && valor !== undefined && valor !== null) {
        if (!valor) {
          erros.push(`${caminhoCompleto.join(".")} → Rua é obrigatória`);
        }
      }

      if (chave === "numero" && valor !== undefined && valor !== null) {
        if (isNaN(valor)) {
          erros.push(`${caminhoCompleto.join(".")} → Número inválido`);
        } else if (valor <= 0) {
          erros.push(`${caminhoCompleto.join(".")} → Número inválido`);
        }
      }

      if (chave === "cod_cidade" && valor !== undefined && valor !== null) {
        if (!valor) {
          erros.push(
            `${caminhoCompleto.join(".")} → Necessário preencher alguma cidade`,
          );
        }
      }
    }
  }

  percorrer(dados);

  return erros.length > 0 ? erros : true;
}
