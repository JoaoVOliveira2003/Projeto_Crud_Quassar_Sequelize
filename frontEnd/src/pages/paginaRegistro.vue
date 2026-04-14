<template>
  <div class="full-height flex flex-center">
    <q-card style="width: 620px;" class="q-pa-md">
      <formularioDadosUsuario @usuarioCriado="passarTela()"/>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import formularioDadosUsuario from '../components/formularioDadosUsuario.vue';
import { useRouter } from 'vue-router'
const router = useRouter()

function passarTela(){
  router.push('/')
}
</script>