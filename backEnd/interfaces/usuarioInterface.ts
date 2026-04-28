export interface DadosUsuario {
  id?: number;
  nome: string;
  dataDeNascimento: string;
  peso: number;
  altura: number;
  criadoPor?: number;
  endereco: {
    id_usuario?: number;
    rua: string;
    numero: number;
    cod_cidade: number;
  };
  login: {
    id_usuario?: number;
    email: string;
    senha: string;
  };
}