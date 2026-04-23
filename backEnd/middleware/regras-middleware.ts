type FuncaoRegra = (valor: unknown) => true | string;

export const regras: Record<string, FuncaoRegra[]> = {
  nome: [
    (valor) => !!valor || "Nome é obrigatório.",
    (valor) =>
      String(valor).toLowerCase() !== "teste" || "Valor teste não é aceito.",
    (valor) =>
      (typeof valor === "string" && valor.length >= 3) ||
      "Nome tem que ser maior que três.",
  ],
  dataDeNascimento: [(valor) => !!valor || "Data é obrigatória."],
  peso: [
    (valor) => (valor !== null && valor !== undefined) || "Peso é obrigatório.",
    (valor) =>
      (typeof valor === "number" && valor > 0) || "Peso deve ser maior que 0.",
  ],
  altura: [
    (valor) =>
      (valor !== null && valor !== undefined) || "Altura é obrigatória.",
    (valor) =>
      (typeof valor === "number" && valor > 0) ||
      "Altura deve ser maior que 0.",
    (valor) => (typeof valor === "number" && valor < 3) || "Altura inválida.",
  ],
  rua: [(valor) => !!valor || "Rua é obrigatória."],
  numero: [
    (valor) =>
      (valor !== null && valor !== undefined) || "Número é obrigatório.",
    (valor) => (typeof valor === "number" && valor > 0) || "Número inválido.",
  ],
  cidadeSelecionada: [
    (valor) =>
      (valor !== null && valor !== undefined) ||
      "Necessário preencher alguma cidade.",
  ],
  email: [
    (valor) => (valor !== null && valor !== undefined) || "Email obrigatório.",
    (valor) =>
      (typeof valor === "string" && valor.length >= 3) ||
      "Email deve ter mais que três caracteres.",
  ],
  senha: [
    (valor) => (valor !== null && valor !== undefined) || "Senha obrigatória.",
    (valor) =>
      (typeof valor === "string" && valor.length >= 3) ||
      "Senha deve ter mais que três caracteres.",
  ],
  novaSenha: [
    (valor) =>
      !valor ||
      (typeof valor === "string" && valor.length >= 3) ||
      "Nova senha deve ter mais que três caracteres.",
  ],
};
