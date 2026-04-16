export interface DadosUsuario {
  id?: number;
  nome: string;
  dataDeNascimento: string;
  peso: number | null;
  altura: number | null;
  endereco: {
    rua: string;
    numero: number | null;
    cod_cidade: number | null;
  };
  login:{
    email: string;
    senha: string;
  }
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
  login:Array<{
    email: string;
    senha: string;
  }>;
}
