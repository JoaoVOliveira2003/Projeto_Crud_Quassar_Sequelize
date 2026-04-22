export interface DadosUsuario {
  id?: number | undefined;
  nome: string;
  dataDeNascimento: string;
  peso: number | null;
  altura: number | null;
  id_tipo_usuario: number | null,
  endereco: {
    rua: string;
    numero: number | null;
    cod_cidade: number | null;
  };
  login:{
    email: string;
    senha?: string;
  }
}
