import axios from "axios";

export  async function carregarUsuarios() {
    try {
      const res = await axios.get('http://localhost:3000/usuario');
      return res.data;
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar usuários.');
    }
  }
