import api from '../../src/utils/apiConector';

export async function carregarTiposUsuarios() {
  try {
    const res = await api.get('/tiposUsuarios');
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
