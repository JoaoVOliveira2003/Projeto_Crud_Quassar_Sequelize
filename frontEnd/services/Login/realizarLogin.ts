// import axios from 'axios';
import type { loginInterface } from '../../interfaces/loginInterface';
import api from '../../src/utils/apiConector'

export async function login(usuario: loginInterface) {
  try {
    const res = await api.post('/login/criarLogin', { usuario });
    return res.data;
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error;
  }
}
