import api from '../../src/utils/apiConector'

export async function deletarUsuario(id: number) {
  try {
    await api.delete(`/usuario/deletarUsuario/${id}`);
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
}