import type { formularioPesquisaInterface } from '../../interfaces/formularioPesquisaInterface';
import api from "src/utils/apiConector";

export async function buscarUsuariosFiltrados(filtros: formularioPesquisaInterface) {
  try {
    const res = await api.get('/usuario/filtroUsuarios', {
      params: filtros
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}