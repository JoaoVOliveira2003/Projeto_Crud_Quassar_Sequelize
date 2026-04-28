import api from '../../src/utils/apiConector'

export async function perfilCookie() {
  try {
    const res = await api.get('/usuario/perfilCookie');
    return res.data;
  } catch (error) {
    console.error(error); 
    throw error; 
  }
}
