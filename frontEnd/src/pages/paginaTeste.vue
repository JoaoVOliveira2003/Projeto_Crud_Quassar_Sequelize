<template>
  <div class="q-pa-md" style="max-width: 600px; margin: auto;">
    <p>Conteúdo dentro de um container estiloso!</p>
    <q-input filled v-model="nome" label="Fale seu nome" class="bordered q-mb-sm" placeholder="nome" clearable />
    <q-btn color="primary" @click="teste()" label="Salvar" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const nome = ref('');

  function teste() {
    alert('oie ' + nome.value);
  }

</script>

<style scoped>

</style>