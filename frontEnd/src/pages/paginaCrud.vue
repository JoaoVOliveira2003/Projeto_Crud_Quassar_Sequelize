<template>

  <botaoLogout />

  <div class="q-pa-md" style="max-width: 600px; margin: auto;">
    <h4 class="flex flex-center q-my-none">Inserir novo usuario </h4>
    <hr />

    <formularioDadosUsuario @usuarioCriado="atualizarFormulario" />
    <br>
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

    <ModalEditar v-model:modeloAberto="modalAberto" :usuario="usuarioParaEditar" @salvar="atualizarUsuario" />
    <ModalDeletar v-model:modeloAberto="modalDeletarAberto" :usuario="usuarioParaDeletar"
      @confirmarDelete="confirmarDelete" />
  </div>

  Tempo ->{{ tempoRestante }} <br>
  id ->{{ valorId }}
</template>


<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import type { QTableColumn } from 'quasar';

import ModalDeletar from '../components/modalDeletar.vue';
import ModalEditar from '../components/modalEditar.vue';
import formularioDadosUsuario from '../components/formularioDadosUsuario.vue';
import botaoLogout from '../components/botaoLogout.vue'

import { carregarUsuarios } from '../../services/Usuarios/listarUsuarioService';
import { atualizarUsuarioService } from '../../services/Usuarios/atualizarUsuarioService';
import { deletarUsuario } from '../../services/Usuarios/deletarUsuarioService';


import type { DadosUsuario, Usuario } from '../../interfaces/usuarioInterface';

type TokenPayload = {
  id_usuario: number;
  exp: number;
};


const valorId = ref<number | null>(null);
const tempoRestante = ref("");

const usuarios = ref<Usuario[]>([]);
const usuarioParaEditar = ref<Usuario | null>(null);
const usuarioParaDeletar = ref<Usuario | null>(null);

const modalAberto = ref(false);
const modalDeletarAberto = ref(false);


const colunas: QTableColumn[] = [
  { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
  { name: 'nome', label: 'Nome', field: 'nome', sortable: true, align: 'left' },
  { name: 'acoes', label: 'Ações', align: 'center', field: () => '' }
];


const token = localStorage.getItem('token');
console.log(token);

if (token) {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    valorId.value = decoded.id_usuario;

    const agora = Math.floor(Date.now() / 1000);
    const restante = decoded.exp - agora;

    tempoRestante.value = restante + " segundos";
  } catch {
    console.log('Token inválido');
  }
}


onMounted(async () => {
  usuarios.value = await carregarUsuarios();
});


async function atualizarFormulario() {
  usuarios.value = await carregarUsuarios();

}

async function atualizarUsuario(dados: Usuario) {
  const dadosCorretos: DadosUsuario = {
    id: dados.id,
    nome: dados.nome,
    dataDeNascimento: dados.dataDeNascimento,
    peso: dados.peso,
    altura: dados.altura,
    endereco: {
      rua: dados.endereco?.rua ?? dados.rua!,
      numero: dados.endereco?.numero ?? dados.numero!,
      cod_cidade: dados.endereco?.cod_cidade ?? dados.cidadeSelecionada!
    },

    login: {
      email: dados.login?.email,
      ...(dados.login?.novaSenha && { senha: dados.login.novaSenha })
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