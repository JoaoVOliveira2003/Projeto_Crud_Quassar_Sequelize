import axios from "axios";

export async function listarCidadeService() {
  try {
    const res = await axios.get('http://localhost:3000/cidade');
    return res.data;
  } catch (error) {
    alert('Erro ao carregar cidades: ' + error);
  }
}