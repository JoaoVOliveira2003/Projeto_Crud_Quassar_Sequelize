<template>
  <div class="q-pa-md" style="max-width: 600px; margin: auto;">

    <q-input filled v-model="nome" label="Nome" class="bordered q-mb-sm" placeholder="Digite seu nome" clearable />

    <q-input filled v-model="dataDeNascimento" label="Data de Nascimento" type="date" class="bordered q-mb-sm"
      placeholder="Selecione sua data de nascimento" clearable />

    <div class="row q-gutter-sm">
      <div class="col">
        <q-input filled v-model.number="peso" label="Peso (kg)" type="number" class="bordered q-mb-sm"
          placeholder="Digite seu peso" clearable />
      </div>
      <div class="col">
        <q-input filled v-model.number="altura" label="Altura (m)" type="number" class="bordered q-mb-sm"
          placeholder="Digite sua altura" clearable />
      </div>
    </div>

    <div class="row q-gutter-sm">
      <div class="col">
        <q-input filled v-model="rua" label="Rua" placeholder="Digite sua rua" clearable />
      </div>
      <div class="col">
        <q-input filled v-model.number="numero" label="Número" type="number" placeholder="Digite o número" clearable />
      </div>
    </div>
<br>
    <!-- Componente de cidade -->
    <CidadeSelect v-model="cidadeSelecionada" />

    <div class="q-mt-md">
      <q-btn color="secondary" class="q-mr-sm" @click="insertUsuario">
        Gravar
      </q-btn>
    </div>

    <hr />

    <!-- Tabela de usuários -->
    <q-table title="Usuários" :rows="usuarios" :columns="colunas" row-key="id">
      <template v-slot:body-cell-acoes="props">
        <q-td align="center">
          <q-btn color="primary" class="q-mr-sm" size="sm" @click="abrirModalEditar(props.row)">
            Editar
          </q-btn>
          <q-btn color="negative" size="sm" @click="abrirModalDeletar(props.row)">
            Deletar
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <!-- Modal de edição -->
    <q-dialog v-model="modalAberto">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Editar usuário</div>
          <q-input v-model="usuarioSelecionado.nome" label="Nome" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="secondary" v-close-popup @click="modalAberto=false" />
          <q-btn flat label="Salvar" color="primary" @click="salvarEdicao" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de deletar -->
    <q-dialog v-model="modalDeletarAberto">
      <q-card style="min-width: 300px">
        <q-card-section class="text-center">
          <div class="text-h6">
            Tem certeza que quer deletar "{{ usuarioSelecionado.nome }}"?
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="Cancelar" color="secondary" v-close-popup @click="modalDeletarAberto=false" />
          <q-btn flat label="Deletar" color="negative" @click="confirmarDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import axios from 'axios';
  import CidadeSelect from 'components/CidadeSelect.vue';

  // Variáveis do formulário
  const nome = ref('');
  const dataDeNascimento = ref('');
  const peso = ref < number | null > (null);
  const altura = ref < number | null > (null);
  const rua = ref('');
  const numero = ref < number | null > (null);
  const cidadeSelecionada = ref < number | null > (null);

  // Usuários e tabelas
  interface Usuario { id: number; nome: string; }
  const usuarios = ref < Usuario[] > ([]);
  const usuarioSelecionado = reactive < Usuario > ({ id: 0, nome: '' });

  // Modais
  const modalAberto = ref(false);
  const modalDeletarAberto = ref(false);

  // Colunas da tabela
  const colunas = [
    { name: 'id', label: 'ID', field: 'id', sortable: true },
    { name: 'nome', label: 'Nome', field: 'nome', sortable: true },
    { name: 'acoes', label: 'Ações', align: 'center' }
  ];

  // Carregar usuários
  onMounted(() => {
    carregarUsuarios();
  });

  async function carregarUsuarios() {
    try {
      const res = await axios.get('http://localhost:3000/getUsuarios');
      usuarios.value = res.data;
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar usuários.');
    }
  }

  // Inserir usuário
  async function insertUsuario() {
    try {
      const res = await axios.post('http://localhost:3000/createUsuario', { nome: nome.value });
      alert('Novo usuário criado: ' + (res.data.nome || nome.value));
      nome.value = '';
      carregarUsuarios();
    } catch (error) {
      console.error(error);
      alert('Erro ao criar usuário.');
    }
  }

  // Modais
  function abrirModalEditar(row: Usuario) {
    usuarioSelecionado.id = row.id;
    usuarioSelecionado.nome = row.nome;
    modalAberto.value = true;
  }

  function abrirModalDeletar(row: Usuario) {
    usuarioSelecionado.id = row.id;
    usuarioSelecionado.nome = row.nome;
    modalDeletarAberto.value = true;
  }

  // Salvar edição
  async function salvarEdicao() {
    try {
      await axios.put(`http://localhost:3000/atualizarUsuario/${usuarioSelecionado.id}`, { nome: usuarioSelecionado.nome });
      alert('Usuário atualizado com sucesso!');
      modalAberto.value = false;
      usuarioSelecionado.id = 0;
      usuarioSelecionado.nome = '';
      carregarUsuarios();
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar usuário.');
    }
  }

  // Confirmar deletar
  async function confirmarDelete() {
    try {
      await axios.delete(`http://localhost:3000/deleteUsuarios/${usuarioSelecionado.id}`);
      alert('Usuário apagado com sucesso!');
      usuarioSelecionado.id = 0;
      usuarioSelecionado.nome = '';
      modalDeletarAberto.value = false;
      carregarUsuarios();
    } catch (error) {
      console.error(error);
      alert('Erro ao deletar usuário.');
      modalDeletarAberto.value = false;
    }
  }
</script>

<style scoped>
  .bordered {
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>