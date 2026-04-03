import axios from 'axios';

export async function deletarUsuario(id: number) {
  try {
    await axios.delete(`http://localhost:3000/usuario/deletarUsuario/${id}`);
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
}