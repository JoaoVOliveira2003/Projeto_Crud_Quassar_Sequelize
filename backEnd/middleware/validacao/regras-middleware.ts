import { regrasUsuario } from './regras/usuarios';
import { regrasEndereco } from './regras/enderecos';
import { regrasLogin } from './regras/login';
import { regrasEstado } from './regras/estado';

export const regras = {
  usuario: regrasUsuario,
  endereco: regrasEndereco,
  login: regrasLogin
};