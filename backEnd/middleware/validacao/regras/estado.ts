// eslint-disable-next-line 
type FuncaoRegra = (valor: unknown) => true | string;
type RegrasObjeto = Record<string, FuncaoRegra[]>;

export const regrasEstado: RegrasObjeto = {
  nome: [
    (valor) => !!valor || 'Nome cidade obrigatório',
  ]
};