<template>
  <div class="q-pa-md" style="max-width: 600px; margin: auto;">

    <q-input filled v-model="nome" label="Nome" class="bordered q-mb-sm" placeholder="Digite seu nome" clearable />
    <q-input filled v-model="dataDeNascimento" label="Data de Nascimento" type="date" class="bordered q-mb-sm"
      placeholder="Selecione sua data de nascimento" clearable />

    <div class="row q-gutter-sm">
      <div class="col">
        <q-input filled v-model.number="peso" label="Peso (int)" type="number" class="bordered q-mb-sm"
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
      <!-- <q-btn color="secondary" class="q-mr-sm" @click="insertUsuario"> -->
      <q-btn color="secondary" class="q-mr-sm" @click="createUsuarioTodosDados">
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
          <q-input type="date" v-model="usuarioSelecionado.dataDeNascimento" label="Data" />
          <q-input type="number" v-model="usuarioSelecionado.peso" label="Peso" />
          <q-input v-model="usuarioSelecionado.altura" label="Altura" />

          <q-input v-model="usuarioSelecionado.rua" label="Rua" />
          <q-input v-model="usuarioSelecionado.numero" label="Número" />

          <CidadeSelect v-model="usuarioSelecionado.cidadeSelecionada" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="secondary" v-close-popup @click="modalAberto=false" />
          <q-btn flat label="Salvar" color="primary" @click="atualizarTodosDadosUsuario" />
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

  const nome = ref('');
  const dataDeNascimento = ref('');
  const peso = ref < number | null > (null);
  const altura = ref < number | null > (null);
  const rua = ref('');
  const numero = ref < number | null > (null);
  const cidadeSelecionada = ref < number | null > (null);

  interface Usuario {
    id: number;
    nome: string;
    peso: number;
    altura: number;
    dataDeNascimento: string;

    rua: string;
    numero: number;
    cidadeSelecionada: number;
  }


  const usuarios = ref < Usuario[] > ([]);

  const usuarioSelecionado = reactive < Usuario > ({
    id: 0,
    nome: '',
    peso: 0,
    altura: 0,
    dataDeNascimento: '',

    rua: '',
    numero: 0,
    cidadeSelecionada: 0
  });

  // Modais
  const modalAberto = ref(false);
  const modalDeletarAberto = ref(false);

  const colunas = [
    { name: 'id', label: 'ID', field: 'id', sortable: true },
    { name: 'nome', label: 'Nome', field: 'nome', sortable: true },
    { name: 'acoes', label: 'Ações', align: '' }
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
  async function createUsuarioTodosDados() {
    const lista_dados = {
      nome: nome.value,
      dataDeNascimento: dataDeNascimento.value,
      peso: peso.value,
      altura: altura.value,
      rua: rua.value,
      numero: numero.value,
      cod_cidade: cidadeSelecionada.value.cod_cidade
    };

    try {
      const res = await axios.post('http://localhost:3000/createUsuarioTodosDados', lista_dados, {
        headers: { 'Content-Type': 'application/json' }
      });

      alert('Novo usuário criado: ' + (res.data.usuario.nome || nome.value));

      // Limpar campos
      nome.value = '';
      dataDeNascimento.value = '';
      peso.value = '';
      altura.value = '';
      rua.value = '';
      numero.value = '';
      cidadeSelecionada.value = null;

      carregarUsuarios();

    } catch (error) {
      console.error(error);
      alert('Erro ao criar usuário: ' + (error.response?.data?.erro || error.message));
    }
  }

  // Modais
  function abrirModalEditar(row: Usuario) {
    const endereco = row.Enderecos?.[0];
    usuarioSelecionado.id = row.id;
    usuarioSelecionado.nome = row.nome;
    usuarioSelecionado.peso = row.peso;
    usuarioSelecionado.altura = row.altura;
    usuarioSelecionado.dataDeNascimento = row.dataDeNascimento ? row.dataDeNascimento.split('T')[0] : '';
    usuarioSelecionado.rua = endereco?.rua || '';
    usuarioSelecionado.numero = endereco?.numero || 0;
    usuarioSelecionado.cidadeSelecionada = endereco?.cod_cidade || 0;
    modalAberto.value = true;
  }

  function abrirModalDeletar(row: Usuario) {
    usuarioSelecionado.id = row.id;
    usuarioSelecionado.nome = row.nome;
    modalDeletarAberto.value = true;
  }

  // Confirmar deletar
  async function confirmarDelete() {
    try {
      await axios.delete(`http://localhost:3000/deleteTodosDadosUsuario/${usuarioSelecionado.id}`);
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

  async function atualizarTodosDadosUsuario() {
    const dados = {
      nome: usuarioSelecionado.nome,
      dataDeNascimento: usuarioSelecionado.dataDeNascimento,
      peso: usuarioSelecionado.peso,
      altura: usuarioSelecionado.altura,
      rua: usuarioSelecionado.rua,
      numero: usuarioSelecionado.numero,
      cod_cidade: usuarioSelecionado.cidadeSelecionada, // 👈 corrigi
    };


    try {

      await axios.put(
        `http://localhost:3000/atualizarTodosDadosUsuario/${usuarioSelecionado.id}`,
        dados
      );


      alert("Dados de usuario atualizado com sucesso");
      modalAberto.value = false;
      usuarioSelecionado.id = 0;
      usuarioSelecionado.nome = '';
      usuarioSelecionado.dataDeNascimento = '';
      usuarioSelecionado.peso = 0;
      usuarioSelecionado.altura = 0;
      usuarioSelecionado.rua = '';
      usuarioSelecionado.numero = 0;
      usuarioSelecionado.cidadeSelecionada = 0;


      carregarUsuarios();
    }
    catch (error) {
      console.log(error);
      alert('erro ao atualizar');
    }
  }

  // Salvar edição
  /*
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
  
  */
</script>

<style scoped>
  .bordered {
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>