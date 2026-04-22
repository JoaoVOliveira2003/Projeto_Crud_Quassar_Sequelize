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

    <q-btn @click="testeToken">
      testeToken
    </q-btn>

    <ModalEditar v-model:modeloAberto="modalAberto" :usuario="usuarioParaEditar" @salvar="atualizarUsuario" />
    <ModalDeletar v-model:modeloAberto="modalDeletarAberto" :usuario="usuarioParaDeletar"
      @confirmarDelete="confirmarDelete" />
  </div>

  Tempo ->{{ tempoRestante }} <br>
  id ->{{ valorId }}
</template>


<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import type { DadosUsuario } from '../../interfaces/usuarioInterface';

import { ref, onMounted, onUnmounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import ModalDeletar from '../components/modalDeletar.vue';
import ModalEditar from '../components/modalEditar.vue';
import formularioDadosUsuario from '../components/formularioDadosUsuario.vue';
import botaoLogout from '../components/botaoLogout.vue'

import { carregarUsuarios } from '../../services/Usuarios/listarUsuarioService';
import { atualizarUsuarioService } from '../../services/Usuarios/atualizarUsuarioService';
import { deletarUsuario } from '../../services/Usuarios/deletarUsuarioService';

type TokenPayload = {
  id_usuario: number;
  exp: number;
};

const usuarios = ref<DadosUsuario[]>([]);
const usuarioParaEditar = ref<DadosUsuario | null>(null);
const usuarioParaDeletar = ref<DadosUsuario | null>(null);

const modalAberto = ref(false);
const modalDeletarAberto = ref(false);

const colunas: QTableColumn[] = [
  { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
  { name: 'nome', label: 'Nome', field: 'nome', sortable: true, align: 'left' },
  { name: 'acoes', label: 'Ações', align: 'center', field: () => '' }
];


const valorId = ref<number | null>(null);
const tempoRestante = ref("");

// ✅ Função reutilizável para ler e decodificar o token
function atualizarTempoToken() {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    valorId.value = decoded.id_usuario;

    const agora = Math.floor(Date.now() / 1000);
    tempoRestante.value = (decoded.exp - agora) + " segundos";
  } catch {
    console.log('Token inválido');
  }
}

let intervalo: ReturnType<typeof setInterval>;
onMounted(async () => {
  usuarios.value = await carregarUsuarios();
  atualizarTempoToken();
  intervalo = setInterval(atualizarTempoToken, 1000);
});

onUnmounted(() => {
  clearInterval(intervalo);
});


function testeToken(){
const token = localStorage.getItem('token');
const decoded = jwtDecode<TokenPayload>(token!);

const segundos = decoded.exp - decoded.iat;
console.log('Duração do token:', segundos, 'segundos');
}

async function atualizarFormulario() {
  usuarios.value = await carregarUsuarios();
}

async function atualizarUsuario(dados: DadosUsuario) {
  const dadosCorretos: DadosUsuario = {
    id: dados.id,
    nome: dados.nome,
    dataDeNascimento: dados.dataDeNascimento,
    peso: dados.peso,
    altura: dados.altura,
    endereco: {
      rua: dados.endereco?.rua ?? dados.endereco.rua!,
      numero: dados.endereco?.numero ?? dados.endereco.numero!,
      cod_cidade: dados.endereco?.cod_cidade ?? dados.endereco.cod_cidade!
    },
    login: {
      email: dados.login?.email,
      ...(dados.login?.senha && { senha: dados.login.senha })
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
    await deletarUsuario(usuarioParaDeletar.value.id!);
    await atualizarFormulario();
    modalDeletarAberto.value = false;
    alert('Usuário deletado com sucesso');
    usuarioParaDeletar.value = null;
  } catch (error) {
    console.error(error);
    alert('Erro ao deletar usuário');
  }
}

function abrirModalEditar(row: DadosUsuario) {
  usuarioParaEditar.value = row;
  modalAberto.value = true;
}

function abrirModalDeletar(row: DadosUsuario) {
  usuarioParaDeletar.value = row;
  modalDeletarAberto.value = true;
}

</script>