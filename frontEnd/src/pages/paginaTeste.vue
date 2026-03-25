<template>
  <div class="q-pa-md" style="max-width: 600px; margin: auto;">
    <p>Conteúdo dentro de um container estiloso!</p>
    <q-input filled v-model="nome" label="Fale seu nome" class="bordered q-mb-sm" placeholder="nome" clearable />
    <q-btn color="secondary" @click="insertUsuario">Teste Insert</q-btn>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';

  const nome = ref('');

 
  async function insertUsuario() {
    try {
      const resposta = await axios.post('http://localhost:3000/createUsuario', { nome: nome.value });
      alert('Novo usuario criado' + resposta.data.nome);
    } catch (error) {
      alert(error);
    }
  }

</script>

<style scoped>

</style>