
//qualquer função usada aqui tem que receber valor e retornar true ou string
// eslint-disable-next-line 
type FuncaoRegra = (valor: unknown) => true | string;

//Define um objeto onde cada chave (string) tem uma lista de funções de validação (FuncaoRegra[])
export const regras: Record<string, FuncaoRegra[]> = {

  nome: [
    (valor) => !!valor || 'Nome é obrigatório.',
    (valor) => String(valor).toLowerCase() !== 'teste' || 'Valor teste não é aceito.',
    (valor) => typeof valor === 'string' && valor.length >= 3 || 'Nome tem que ser maior que três.',
  ],
  dataDeNascimento: [
    (valor) => !!valor || 'Data é obrigatória valor',
  ],
  peso: [
    (valor) => valor !== null && valor !== undefined || 'Peso é obrigatório valor',
    (valor) => typeof valor === 'number' && valor > 0 || 'Peso deve ser maior que 0',
  ],
  altura: [
    (valor) => valor !== null && valor !== undefined || 'Altura é obrigatória',
    (valor) => typeof valor === 'number' && valor > 0 || 'Altura deve ser maior que 0',
    (valor) => typeof valor === 'number' && valor < 3 || 'Altura inválida',
  ],
  rua: [
    (valor) => !!valor || 'Rua é obrigatória',
  ],
  numero: [
    (valor) => valor !== null && valor !== undefined || 'Número é obrigatório',
    (valor) => typeof valor === 'number' && valor > 0 || 'Número inválido',
  ],
  cidadeSelecionada:[
    (valor) => valor !== null && valor !== undefined || 'Nescessario preencher alguma cidade',
  ],
  email:[
    (valor) => valor !== null && valor !== undefined || 'Email obrigatoria',
    (valor) => typeof valor === 'string' && valor.length >= 3 || 'Email deve ter mais que tres caracteres'
  ],
  senha:[
    (valor) => valor !== null && valor !== undefined || 'Senha obrigatoria',
    (valor) => typeof valor === 'string' && valor.length >= 3 || 'Senha deve ter mais que tres caracteres'
  ],
  novaSenha:[
  (valor) => !valor || (typeof valor === 'string' && valor.length >= 3) || 'Nova senha deve ter mais que três caracteres'
  ],
  tipoUsuario:[
    (valor) => valor !== null && valor !== undefined || 'Nescessario preencher algum tipo',
  ]
};
