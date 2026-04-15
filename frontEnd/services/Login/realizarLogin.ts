import axios from 'axios';
import type { loginInterface } from '../../interfaces/loginInterface';

export async function login(usuario: loginInterface) {
  try {
    const res = await axios.post(
      `http://localhost:3000/login/criarLogin`,
      { usuario },
      { headers: { 'Content-Type': 'application/json' } },
    );
    return res.data;
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error;
  }
}
