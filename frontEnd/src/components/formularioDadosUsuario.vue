<template>
  <q-form ref="formRef" greedy @submit.prevent="createUsuarioTodosDados">

    <q-input filled v-model="formularioPrincipal.nome" label="Nome" class="bordered q-mb-sm" placeholder="Digite seu nome" clearable hide-bottom-space lazy-rules :rules="regras.usuario.nome"/>

    <q-input lazy-rules filled v-model="formularioPrincipal.dataDeNascimento" label="Data de Nascimento" type="date"
      class="bordered q-mb-sm" clearable hide-bottom-space :rules="regras.usuario.dataDeNascimento" />

    <div class="row q-gutter-sm">
      <div class="col">
        <q-input lazy-rules filled v-model.number="formularioPrincipal.peso" label="Peso (kg)" type="number"
          class="bordered q-mb-sm" clearable hide-bottom-space @keypress="limparCampoPeso" :rules="regras.usuario.peso" />
      </div>

      <div class="col">
        <q-input lazy-rules filled v-model.number="formularioPrincipal.altura" label="Altura (m)" type="number"
          step="0.01" class="bordered q-mb-sm" clearable hide-bottom-space :rules="regras.usuario.altura" />
      </div>
    </div>

    <div class="row q-gutter-sm">
      <div class="col">
        <q-input lazy-rules filled v-model="formularioPrincipal.rua" label="Rua" placeholder="Digite sua rua" clearable
          hide-bottom-space :rules="regras.endereco.rua" />
      </div>

      <div class="col">
        <q-input lazy-rules filled v-model.number="formularioPrincipal.numero" label="Número" type="number" clearable
          hide-bottom-space :rules="regras.endereco.numero" />
      </div>
    </div>
    <br>
    <div class="row q-gutter-sm">
      <div class="col">
       <selectCidade lazy-rules v-model="formularioPrincipal.cidadeSelecionada" :rules="regras.endereco.cidadeSelecionada" />
      </div>
      <div class="col">
        <selectTipoUsuario lazy-rules v-model="formularioPrincipal.tipoUsuario" :rules="regras.usuario.tipoUsuario"/>
      </div> 
    </div>
 
    <div class="row q-gutter-sm">
      <div class="col">
        <q-input lazy-rules filled v-model="formularioPrincipal.email" label="Email" placeholder="Digite sua email"
          clearable hide-bottom-space :rules="regras.login.email" autocomplete="email" />
      </div>

      <div class="col">
      <InputSenha  v-model="formularioPrincipal.senha" label="Senha" :rules="regras.login.senha"/>                      

      </div>
    </div>

    <div class="q-mt-md">
      <q-btn v-if="botaoVoltar"  label="Tela de login" color="secondary" class="q-mr-xs" to="/login"/>
      <q-btn color="secondary"  label="Gravar"  type="submit" />
    </div>

  </q-form>

</template>
<script setup lang="ts">
import { regras } from 'src/utils/validacao/regras'
import selectCidade from '../components/selectCidade.vue';
import selectTipoUsuario from '../components/selectTipoUsuario.vue';
import { criarUsuario } from '../../services/Usuarios/criarUsuarioService';
import { validarObjeto } from 'src/utils/validacao/validacao'
import { ref, reactive, } from 'vue';
import type { DadosUsuario } from '../../interfaces/usuarioInterface'
import InputSenha from './inputSenha.vue'

const formRef = ref();
const emit = defineEmits(['usuarioCriado']);

defineProps({
  botaoVoltar: Boolean
})

const estadoInicial = {
  nome: '',
  dataDeNascimento: '',
  peso: null,
  altura: null,
  rua: '',
  numero: null,
  cidadeSelecionada: null,
  tipoUsuario:null,
  email:'',
  senha:''
};

const formularioPrincipal = reactive({
  nome: '',
  dataDeNascimento: '',
  peso: null as number | null,
  altura: null as number | null,
  rua: '',
  numero: null as number | null,
  tipoUsuario: null as number | null,
  cidadeSelecionada: null as number | null,
  email:'',
  senha:''
});

async function createUsuarioTodosDados() {

  const usuario: DadosUsuario =
  {
    nome: formularioPrincipal.nome,
    dataDeNascimento: formularioPrincipal.dataDeNascimento,
    peso: formularioPrincipal.peso,
    altura: formularioPrincipal.altura,
    id_tipo_usuario:formularioPrincipal.tipoUsuario,
    endereco: {
      rua: formularioPrincipal.rua,
      numero: formularioPrincipal.numero,
      cod_cidade: formularioPrincipal.cidadeSelecionada
    },
    login:{
     email: formularioPrincipal.email,
     senha: formularioPrincipal.senha,
    }
  };

  const erros = validarObjeto(usuario)
  if (erros.length > 0) {
    alert(erros.join('\n'))
    return
  }

  try {
    const res = await criarUsuario(usuario);
    
    emit('usuarioCriado', res);

    alert('Novo usuário criado: ' + (res.nome || formularioPrincipal.nome));
    limparFormularioPrincipal();
  } catch (error) {
    alert('Erro ao criar usuário: ' + error);
  }
}

function limparFormularioPrincipal() {
  Object.assign(formularioPrincipal, estadoInicial);

  if (formRef.value) {
    formRef.value.resetValidation();
  }

}

function limparCampoPeso(event: KeyboardEvent) {
  if (event.key === ',' || event.key === '.' || !/[0-9]/.test(event.key)) event.preventDefault();
}
</script>