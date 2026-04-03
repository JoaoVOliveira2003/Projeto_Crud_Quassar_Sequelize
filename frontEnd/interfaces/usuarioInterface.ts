// src/interfaces/usuario.ts

// Interface para CRIAR/ATUALIZAR usuário (formato que vai para a API)
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

// Interface do usuário que VOLTA da API (pode vir achatado ou com endereco array)
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
