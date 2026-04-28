import api from '../../src/utils/apiConector';

export async function listarDadosUsuarioLogado() {
  try {
    const res = await api.get('usuarioLogado/getUsuarioLogado');
    return res;
  } catch (error) {
    console.error('Erro ao atualizar' + error);
    throw error;
  }
}
