<template>
  <div class="q-pa-md" style="max-width: 600px; margin: auto;">
    <!-- FORMULÁRIO PRINCIPAL -->
    <q-form ref="formRef" greedy @submit.prevent="createUsuarioTodosDados">

      <!-- Nome -->
      <q-input filled v-model="formularioPrincipal.nome" label="Nome" class="bordered q-mb-sm"
        placeholder="Digite seu nome" clearable hide-bottom-space lazy-rules :rules="regras.nome" />

      <!-- Data -->
      <q-input lazy-rules filled v-model="formularioPrincipal.dataDeNascimento" label="Data de Nascimento" type="date"
        class="bordered q-mb-sm" clearable hide-bottom-space :rules="regras.dataDeNascimento" />

      <div class="row q-gutter-sm">
        <!-- Peso -->
        <div class="col">
          <q-input lazy-rules filled v-model.number="formularioPrincipal.peso" label="Peso (kg)" type="number"
            class="bordered q-mb-sm" clearable hide-bottom-space @keypress="limparCampoPeso" :rules="regras.peso" />
        </div>

        <!-- Altura -->
        <div class="col">
          <q-input lazy-rules filled v-model.number="formularioPrincipal.altura" label="Altura (m)" type="number"
            step="0.01" class="bordered q-mb-sm" clearable hide-bottom-space :rules="regras.altura" />
        </div>
      </div>

      <div class="row q-gutter-sm">
        <!-- Rua -->
        <div class="col">
          <q-input lazy-rules filled v-model="formularioPrincipal.rua" label="Rua" placeholder="Digite sua rua"
            clearable hide-bottom-space :rules="regras.rua" />
        </div>

        <!-- Número -->
        <div class="col">
          <q-input lazy-rules filled v-model.number="formularioPrincipal.numero" label="Número" type="number" clearable
            hide-bottom-space :rules="regras.numero" />
        </div>
      </div>

      <br>

      <!-- Cidade -->
      <CidadeSelect lazy-rules v-model="formularioPrincipal.cidadeSelecionada" :rules="regras.cidadeSelecionada" />

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
import type { QTableColumn } from 'quasar';

import ModalDeletar from '../components/modalDeletar.vue';
import ModalEditar from '../components/modalDeletar.vue';
import CidadeSelect from '../components/cidadeSelect.vue';

import { carregarUsuarios } from '../../services/Usuarios/listarUsuarioService';
import { criarUsuario } from '../../services/Usuarios/criarUsuarioService';
import { atualizarUsuarioService } from '../../services/Usuarios/atualizarUsuarioService';
import { deletarUsuario } from '../../services/Usuarios/deletarUsuarioService';
import { validarObjeto } from 'src/utils/validacao/validacao'

import { ref, reactive, onMounted } from 'vue';

import type { DadosUsuario, Usuario } from '../../interfaces/usuarioInterface'
import { regras } from 'src/utils/validacao/regras'


const formRef = ref();
const usuarioParaEditar = ref<Usuario | null>(null);

const usuarios = ref<Usuario[]>([]);
const usuarioParaDeletar = ref<Usuario | null>(null);

const modalAberto = ref(false);
const modalDeletarAberto = ref(false);

const formularioPrincipal = reactive({
  nome: '',
  dataDeNascimento: '',
  peso: null as number | null,
  altura: null as number | null,
  rua: '',
  numero: null as number | null,
  cidadeSelecionada: null as number | null
});

const colunas: QTableColumn[] = [
  { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
  { name: 'nome', label: 'Nome', field: 'nome', sortable: true, align: 'left' },
  { name: 'acoes', label: 'Ações', align: 'center', field: () => '' }
];



onMounted(async () => {
  usuarios.value = await carregarUsuarios();
});

async function createUsuarioTodosDados() {


  const usuario: DadosUsuario =
  {
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

  const erros = validarObjeto(usuario)
  if (erros.length > 0) {
    alert(erros.join('\n'))
    return
  }

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

async function atualizarUsuario(dados: Usuario) {
  const dadosCorretos: DadosUsuario = {
    id: dados.id,
    nome: dados.nome,
    dataDeNascimento: dados.dataDeNascimento,
    peso: dados.peso,
    altura: dados.altura,
    endereco: {
      rua: dados.endereco?.[0]?.rua || dados.rua!,
      numero: dados.endereco?.[0]?.numero || dados.numero!,
      cod_cidade: dados.endereco?.[0]?.cod_cidade || dados.cidadeSelecionada!
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
  usuarioParaEditar.value = row;
  modalAberto.value = true;
}

function abrirModalDeletar(row: Usuario) {
  usuarioParaDeletar.value = row;
  modalDeletarAberto.value = true;
}

function limparCampoPeso(event: KeyboardEvent) {
  if (event.key === ',' || event.key === '.' || !/[0-9]/.test(event.key)) event.preventDefault();
}

</script>