<template>
  <div class="q-pa-md" style="max-width: 600px; margin: auto;">
    <h4 class="flex flex-center q-my-none">Dados de usuario</h4>
    <hr/>
    
    <formularioDadosUsuario @usuarioCriado="atualizarFormulario"/>

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
import ModalEditar from '../components/modalEditar.vue';
import formularioDadosUsuario from '../components/formularioDadosUsuario.vue';

import { carregarUsuarios } from '../../services/Usuarios/listarUsuarioService';
import { atualizarUsuarioService } from '../../services/Usuarios/atualizarUsuarioService';
import { deletarUsuario } from '../../services/Usuarios/deletarUsuarioService';

import { ref,  onMounted } from 'vue';

import type { DadosUsuario, Usuario } from '../../interfaces/usuarioInterface'

const usuarioParaEditar = ref<Usuario | null>(null);

const usuarios = ref<Usuario[]>([]);
const usuarioParaDeletar = ref<Usuario | null>(null);

const modalAberto = ref(false);
const modalDeletarAberto = ref(false);



const colunas: QTableColumn[] = [
  { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
  { name: 'nome', label: 'Nome', field: 'nome', sortable: true, align: 'left' },
  { name: 'acoes', label: 'Ações', align: 'center', field: () => '' }
];

onMounted(async () => {
  usuarios.value = await carregarUsuarios();
});

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



</script>