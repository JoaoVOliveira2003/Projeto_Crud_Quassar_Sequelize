import api from '../../src/utils/apiConector'

export async function carregarUsuarios() {
  try {
    const res = await api.get('/usuario');
    return res.data;
  } catch (error) {
    console.error(error); 
    throw error; 
  }
}
