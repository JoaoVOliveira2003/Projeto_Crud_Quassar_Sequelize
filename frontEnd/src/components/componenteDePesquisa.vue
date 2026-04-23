<template>
  <div class="q-pa-md">

    <h5 class="q-mb-md text-weight-medium">
      Pesquisar dados na tabela
    </h5>

    <div class="row q-col-gutter-md items-end">

      <div class="col-12 col-md-4">
        <q-input
          filled
          dense
          v-model="formularioPesquisa.nome"
          label="Nome"
          clearable
          hide-bottom-space
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-4">
        <selectTipoUsuario
          dense
          v-model="formularioPesquisa.tipoUsuario"
        />
      </div>

      <div class="col-12 col-md-4 flex justify-end q-gutter-sm">
        <q-btn
          label="Limpar"
          color="primary"
          icon="clear"
          unelevated
          @click="resetar"
        />

        <q-btn
          label="Pesquisar"
          color="primary"
          icon="search"
          unelevated
          @click="pesquisar"
        />
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import selectTipoUsuario from './selectTipoUsuario.vue'

const emit = defineEmits(['pesquisar']);

const estadoInicial = {
  nome: '',
  tipoUsuario: null as number | null,
};

const formularioPesquisa = reactive({ ...estadoInicial });

function pesquisar() {
  emit('pesquisar', { ...formularioPesquisa });
}

function resetar() {
  Object.assign(formularioPesquisa, estadoInicial);
  pesquisar();
}
</script>