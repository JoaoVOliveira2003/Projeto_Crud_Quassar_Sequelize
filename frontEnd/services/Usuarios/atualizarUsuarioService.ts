import axios from 'axios';
import type { DadosUsuario } from '../../interfaces/usuarioInterface';

export async function atualizarUsuarioService(usuario: DadosUsuario) {

  try {
    await axios.put(
      `http://localhost:3000/usuario/atualizarUsuario/${usuario.id}`,
      { usuario },
      { headers: { 'Content-Type': 'application/json' } },
    );

    // return response.data;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
}
