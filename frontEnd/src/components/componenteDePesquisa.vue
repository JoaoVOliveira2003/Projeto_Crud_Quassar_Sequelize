<template>
    <div class="row q-gutter-sm">
        <div class="col">
                    <q-input filled v-model="formularioLocal.nome" label="Nome" class="bordered q-mb-sm" clearable
                        hide-bottom-space lazy-rules :rules="regras.nome" />
        </div>
        <div class="col">
            <selectTipoUsuario class="q-mb-sm" v-model=""/>
        </div>
    </div>

    <q-btn>

    </q-btn>
</template>
<script setup lang="ts">
import selectTipoUsuario from './selectTipoUsuario.vue'

</script>