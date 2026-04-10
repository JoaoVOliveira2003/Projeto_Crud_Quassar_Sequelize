export interface DadosUsuario {
  id?: number;
  nome: string;
  dataDeNascimento: string;
  peso: number;
  altura: number;
  endereco: {
    id_usuario : number,
    rua: string;
    numero: number;
    cod_cidade: number;
  };
}

export interface Usuario {
  id: number;
  nome: string;
  peso: number;
  altura: number;
  dataDeNascimento: string;
  rua?: string;
  numero?: number;
  cidadeSelecionada?: number;
  endereco?: Array<{
    id_usuario : number,
    rua: string;
    numero: number;
    cod_cidade: number;
  }>;
}
