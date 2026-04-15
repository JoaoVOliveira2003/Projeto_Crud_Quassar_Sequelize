// import axios from 'axios';
import type { DadosUsuario } from '../../interfaces/usuarioInterface';
import api from '../../src/utils/apiConector';

export async function criarUsuario(usuario: DadosUsuario) {
  try {
    const res = await api.post('/usuario/criarUsuario', { usuario });
    return res.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}

// const res = await axios.post(
//   'http://localhost:3000/usuario/criarUsuario/',
//   { usuario },
//   { headers: { 'Content-Type': 'application/json' } },
// );
