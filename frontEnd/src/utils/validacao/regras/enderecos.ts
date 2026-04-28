// eslint-disable-next-line 
type FuncaoRegra = (valor: unknown) => true | string;
type RegrasObjeto = Record<string, FuncaoRegra[]>;

export const regrasEndereco: RegrasObjeto = {
  rua: [
    (valor) => !!valor || 'Rua obrigatória',
  ],

  numero: [
    (valor) =>
      valor !== null && valor !== undefined || 'Número obrigatório',

    (valor) =>
      typeof valor === 'number' && valor > 0 || 'Número inválido',
  ],

  cidadeSelecionada: [
    (valor) => !!valor || 'Selecione cidade',
  ],

  nomeCidade: [
    (valor) => !!valor || 'Nome cidade obrigatório',
  ]
};