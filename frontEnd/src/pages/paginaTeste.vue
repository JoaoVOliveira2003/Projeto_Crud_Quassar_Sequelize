<template>
  <div class="q-pa-md" style="max-width: 600px; margin: auto;">
    <q-input 
      filled 
      v-model="nome" 
      label="Novo nome" 
      class="bordered q-mb-sm" 
      placeholder="nome" 
      clearable 
    />
    <q-btn color="secondary" @click="insertUsuario">Teste Insert</q-btn>
    <hr>
    
    <q-table 
      title="Usuários" 
      :rows="usuarios" 
      :columns="colunas" 
      row-key="id"
    >

      <template v-slot:body-cell-acoes="props">
        <q-td align="center">
          <q-btn color="primary" class="q-mr-sm" size="sm" @click="teste(props.row)">
            Editar
          </q-btn>
          <q-btn color="negative" size="sm" @click="teste(props.row)">
            Deletar
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const nome = ref('');
const usuarios = ref([]);

const colunas = [
  { name: 'id', label: 'ID', field: 'id', sortable: true },
  { name: 'nome', label: 'Nome', field: 'nome', sortable: true },
  { name: 'acoes', label: 'Ações',align: 'center' } 
];

onMounted(() => {
  carregarUsuarios();
});

async function carregarUsuarios() {
  try {
    const res = await axios.get('http://localhost:3000/getUsuarios');
    usuarios.value = res.data;
  } catch (error) {
    console.error(error);
  }
}

async function insertUsuario() {
  if (!nome.value.trim()) {
    alert('Digite um nome válido!');
    return;
  }
  try {
    const resposta = await axios.post('http://localhost:3000/createUsuario', { nome: nome.value });
    alert('Novo usuário criado: ' + (resposta.data.nome || nome.value));
    nome.value = ''; // limpa o input
    carregarUsuarios(); // atualiza a tabela
  } catch (error) {
    console.error(error);
    alert('Erro ao criar usuário.');
  }
}

// Agora recebe a linha da tabela
function teste() {
  alert('a');
}
</script>

<style scoped>
.bordered {
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>