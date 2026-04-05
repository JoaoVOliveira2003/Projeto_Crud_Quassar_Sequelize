<template>
  <div class="q-pa-md" style="max-width: 600px; margin: auto;">
    <!-- FORMULÁRIO PRINCIPAL -->
    <q-form ref="formRef" greedy @submit.prevent="createUsuarioTodosDados">

      <!-- Nome -->
      <q-input filled v-model="formularioPrincipal.nome" label="Nome" class="bordered q-mb-sm"
        placeholder="Digite seu nome" clearable hide-bottom-space :rules="[
          val => !!val || 'Nome é obrigatório',
          val => val.length >= 3 || 'Nome deve ter pelo menos 3 caracteres'
        ]" lazy-rules />

      <!-- Data -->
      <q-input lazy-rules filled v-model="formularioPrincipal.dataDeNascimento" label="Data de Nascimento" type="date"
        class="bordered q-mb-sm" clearable hide-bottom-space :rules="[ val => !!val || 'Data é obrigatória' ] " />

      <div class="row q-gutter-sm">
        <!-- Peso -->
        <div class="col">
          <q-input lazy-rules filled v-model.number="formularioPrincipal.peso" label="Peso (kg)" type="number"
            class="bordered q-mb-sm" clearable hide-bottom-space @keypress="limparCampoPeso" :rules="[
              val => val !== null || 'Peso é obrigatório',
              val => val > 0 || 'Peso deve ser maior que 0',
              val => val < 500 || 'Peso inválido'
            ]" />
        </div>

        <!-- Altura -->
        <div class="col">
          <q-input lazy-rules filled v-model.number="formularioPrincipal.altura" label="Altura (m)" type="number"
            step="0.01" class="bordered q-mb-sm" clearable hide-bottom-space :rules="[
              val => val !== null || 'Altura é obrigatória',
              val => val > 0 || 'Altura deve ser maior que 0',
              val => val < 3 || 'Altura inválida'
            ]" />
        </div>
      </div>

      <div class="row q-gutter-sm">
        <!-- Rua -->
        <div class="col">
          <q-input lazy-rules filled v-model="formularioPrincipal.rua" label="Rua" placeholder="Digite sua rua"
            clearable hide-bottom-space :rules="[ val => !!val || 'Rua é obrigatória' ]" />
        </div>

        <!-- Número -->
        <div class="col">
          <q-input lazy-rules filled v-model.number="formularioPrincipal.numero" label="Número" type="number" clearable
            hide-bottom-space
            :rules="[ val => val !== null || 'Número é obrigatório', val => val > 0 || 'Número inválido' ]" />
        </div>
      </div>

      <br>

      <!-- Cidade -->
      <CidadeSelect lazy-rules v-model="formularioPrincipal.cidadeSelecionada" />

      <div class="q-mt-md">
        <q-btn color="secondary" label="Gravar" type="submit" />
      </div>

    </q-form>

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
    <ModalEditar v-model:modeloAberto="modalAberto" :usuario="usuarioParaEditar" @salvar="atualizarUsuario" />


    <!-- Modal de deletar -->
    <ModalDeletar v-model:modeloAberto="modalDeletarAberto" :usuario="usuarioParaDeletar"
      @confirmarDelete="confirmarDelete" />


  </div>
</template>

<script setup lang="ts">
  import ModalDeletar from 'components/ModalDeletar.vue';
  import ModalEditar from 'components/ModalEditar.vue';
  import CidadeSelect from 'components/CidadeSelect.vue';

  import { carregarUsuarios } from '../../services/Usuarios/listarUsuarioService';
  import { criarUsuario } from '../../services/Usuarios/criarUsuarioService';
  import { atualizarUsuarioService } from '../../services/Usuarios/atualizarUsuarioService';
  import { deletarUsuario } from '../../services/Usuarios/deletarUsuarioService';

  import { ref, reactive, onMounted } from 'vue';

  const formRef = ref();
  const usuarioParaEditar = ref < Usuario | null > (null);

  const usuarios = ref < Usuario[] > ([]);
  const usuarioParaDeletar = ref < Usuario | null > (null);

  const modalAberto = ref(false);
  const modalDeletarAberto = ref(false);

  interface DadosUsuario {
    id: number;
    nome: string;
    peso: number;
    altura: number;
    dataDeNascimento: string;
    endereco?: Array<{
      rua: string;
      numero: number;
      cod_cidade: number;
    }>;
  }

  const formularioPrincipal = reactive({
    nome: '',
    dataDeNascimento: '',
    peso: null as number | null,
    altura: null as number | null,
    rua: '',
    numero: null as number | null,
    cidadeSelecionada: null as number | null
  });

  const colunas = [
    { name: 'id', label: 'ID', field: 'id', sortable: true },
    { name: 'nome', label: 'Nome', field: 'nome', sortable: true },
    { name: 'acoes', label: 'Ações', align: '' }
  ];

  onMounted(async () => {
    usuarios.value = await carregarUsuarios();
  });

  async function createUsuarioTodosDados() {
    const isFormValid = await formRef.value.validate();

    if (!isFormValid) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    if (!formularioPrincipal.cidadeSelecionada) {
      alert('Por favor, selecione uma cidade.');
      return;
    }

    const usuario = {
      nome: formularioPrincipal.nome,
      dataDeNascimento: formularioPrincipal.dataDeNascimento,
      peso: formularioPrincipal.peso,
      altura: formularioPrincipal.altura,
      endereco: {
        rua: formularioPrincipal.rua,
        numero: formularioPrincipal.numero,
        cod_cidade: formularioPrincipal.cidadeSelecionada
      }
    };

    try {
      const res = await criarUsuario(usuario);
      await atualizarFormulario();
      alert('Novo usuário criado: ' + (res.nome || formularioPrincipal.nome));
      limparFormularioPrincipal();
    } catch (error) {
      alert('Erro ao criar usuário: ' + error);
    }
  }

  const estadoInicial = {
    nome: '',
    dataDeNascimento: '',
    peso: null,
    altura: null,
    rua: '',
    numero: null,
    cidadeSelecionada: null
  };

  function limparFormularioPrincipal() {
    Object.assign(formularioPrincipal, estadoInicial);

    if (formRef.value) {
      formRef.value.resetValidation();
    }

  }

  // No Usuarios.vue
  async function atualizarUsuario(dados) {
    // SEMPRE montar a estrutura correta, sem confiar no que veio
    const dadosCorretos: DadosUsuario = {
      id: dados.id,
      nome: dados.nome,
      dataDeNascimento: dados.dataDeNascimento,
      peso: dados.peso,
      altura: dados.altura,
      endereco: {
        rua: dados.endereco?.rua || dados.rua,  // tenta pegar de endereco ou direto
        numero: dados.endereco?.numero || dados.numero,
        cod_cidade: dados.endereco?.cod_cidade || dados.cidadeSelecionada
      }
    };

    try {
      await atualizarUsuarioService(dadosCorretos);
      modalAberto.value = false;
      await atualizarFormulario();
      alert('Usuário atualizado com sucesso');
      usuarioParaEditar.value = null;
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar usuário');
    }
  }





  async function atualizarFormulario() {
    usuarios.value = await carregarUsuarios();
  }

  async function confirmarDelete() {
    if (!usuarioParaDeletar.value) return;

    try {
      await deletarUsuario(usuarioParaDeletar.value.id);
      await atualizarFormulario();
      modalDeletarAberto.value = false;
      alert('Usuário deletado com sucesso');
      usuarioParaDeletar.value = null;
    } catch (error) {
      console.error(error);
      alert('Erro ao deletar usuário');
    }
  }

  function abrirModalEditar(row: Usuario) {
    usuarioParaEditar.value = row;  // APENAS ISSO!
    modalAberto.value = true;
  }


  function abrirModalDeletar(row: Usuario) {
    usuarioParaDeletar.value = row;
    modalDeletarAberto.value = true;
  }

  function limparCampoPeso(event: KeyboardEvent) {
    if (event.key === ',' || event.key === '.' || !/[0-9]/.test(event.key)) event.preventDefault();
  }

  // Interface para o tipo Usuario (ajuste conforme sua necessidade)
  interface Usuario {
    id: number;
    nome: string;
    peso: number;
    altura: number;
    dataDeNascimento: string;
    rua?: string;
    numero?: number;
    cidadeSelecionada?: number;
    endereco?: Array<{
      rua: string;
      numero: number;
      cod_cidade: number;
    }>;
  }
</script>