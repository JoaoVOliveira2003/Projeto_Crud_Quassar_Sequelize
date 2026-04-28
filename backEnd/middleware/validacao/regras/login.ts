// eslint-disable-next-line 
type FuncaoRegra = (valor: unknown) => true | string;
type RegrasObjeto = Record<string, FuncaoRegra[]>;

export const regrasLogin: RegrasObjeto = {
  email: [
    (valor) => !!valor || 'Email obrigatório',
    (valor) => typeof valor === 'string' && valor.length >= 3 || 'Email inválido',
  ],

  senha: [
    (valor) => !!valor || 'Senha obrigatória',
    (valor) => typeof valor === 'string' && valor.length >= 3 || 'Senha inválida',
  ],

  novaSenha: [
    (valor) =>
      !valor ||
      (typeof valor === 'string' && valor.length >= 3) ||
      'Nova senha inválida',
  ],
};