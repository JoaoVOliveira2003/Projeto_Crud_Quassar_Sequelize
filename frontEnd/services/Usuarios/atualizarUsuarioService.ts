import type { DadosUsuario } from '../../interfaces/usuarioInterface';
import api from '../../src/utils/apiConector'

export async function atualizarUsuarioService(usuario: DadosUsuario) {
  try {

    const res =  await api.put(`/usuario/atualizarUsuario/${usuario.id}`, { usuario });

    return res.data;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
}
