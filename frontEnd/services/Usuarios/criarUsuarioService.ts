import axios from 'axios';
import type { DadosUsuario } from '../../interfaces/usuarioInterface';

export async function criarUsuario(usuario: DadosUsuario) {
  try {
    const res = await axios.post(
      'http://localhost:3000/usuario/criarUsuario/',
      { usuario },
      { headers: { 'Content-Type': 'application/json' } },
    );
    return res.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}
