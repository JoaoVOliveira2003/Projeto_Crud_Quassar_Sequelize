import api from '../../src/utils/apiConector'

export async function listarCidadeService() {
  try {
    const res = await api.get('/cidade');
    return res.data;
    } catch (error) {
    alert('Erro ao carregar cidades: ' + error);
  }
}