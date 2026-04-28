// eslint-disable-next-line
type FuncaoRegra = (valor: unknown) => true | string;
type RegrasObjeto = Record<string, FuncaoRegra[]>;

export const regrasUsuario: RegrasObjeto = {
  nome: [
    (valor) => !!valor || "Nome obrigatório",
    (valor) =>
      (typeof valor === "string" && valor.length >= 3) || "Nome inválido",
  ],

  dataDeNascimento: [(valor) => !!valor || "Data obrigatória"],

  peso: [
    (valor) => (valor !== null && valor !== undefined) || "Peso obrigatório",
    (valor) => (typeof valor === "number" && valor > 0) || "Peso inválido",
  ],

  altura: [
    (valor) => (valor !== null && valor !== undefined) || "Altura obrigatória",
    (valor) => (typeof valor === "number" && valor > 0) || "Altura inválida",
  ],

  id_tipo_usuario: [(valor) => !!valor || "Tipo é obrigatorio"],
};
