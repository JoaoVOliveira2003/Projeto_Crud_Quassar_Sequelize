export interface DadosUsuario {
  id?: number;
  nome: string;
  dataDeNascimento: string;
  peso: number;
  altura: number;
  endereco: {
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
    rua: string;
    numero: number;
    cod_cidade: number;
  }>;
}
