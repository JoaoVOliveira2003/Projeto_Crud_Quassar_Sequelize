export interface DadosUsuario {
  id?: number;
  nome: string;
  dataDeNascimento: string;
  peso: number;
  altura: number;
  endereco: {
    id_usuario? : number,
    rua: string;
    numero: number;
    cod_cidade: number;
  };
}

