// import axios from 'axios';
import type { DadosUsuario } from '../../interfaces/usuarioInterface';
import api from '../../src/utils/apiConector'

export async function atualizarUsuarioService(usuario: DadosUsuario) {

  try {
    await api.put(`/usuario/atualizarUsuario/${usuario.id}`, { usuario });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
}
