<template>
  <q-dialog v-model="model">
    <q-card style="min-width: 300px">
      <q-card-section class="text-center">
        <div class="text-h6">
          Tem certeza que quer deletar "{{ usuario?.nome }}"?
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat label="Cancelar" color="secondary" v-close-popup />
        <q-btn flat label="Deletar" color="negative" @click="confirmarDelete" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { DadosUsuario } from '../../interfaces/usuarioInterface'

  const props = defineProps<{
    modeloAberto: boolean, usuario?: DadosUsuario | null
  }>()

  const emit = defineEmits<{
    'update:modeloAberto': [value: boolean], 'confirmarDelete': []
  }>()

  const model = computed({
    get: () => props.modeloAberto, set: (val) => emit('update:modeloAberto', val)
  })

  function confirmarDelete() {
    emit('confirmarDelete')
  }
</script>