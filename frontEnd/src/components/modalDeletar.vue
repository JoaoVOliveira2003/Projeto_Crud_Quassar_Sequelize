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

  // Props
  const props = defineProps < {
    modeloAberto: boolean
  usuario?: Usuario | null
  } > ()

  // Emits
const emit = defineEmits<{
  (_e: 'update:modeloAberto', _value: boolean): void
  (_e: 'confirmarDelete'): void
}>()

  // 🔥 Aqui está o pulo do gato (substitui ref + watch)
  const model = computed({
    get: () => props.modeloAberto,
    set: (val) => emit('update:modeloAberto', val)
  })

  function confirmarDelete() {
    emit('confirmarDelete')
  }

  // Interface
  interface Usuario {
    id: number
    nome: string
    peso: number
    altura: number
    dataDeNascimento: string
    endereco?: Array<{
      rua: string
      numero: number
      cod_cidade: number
    }>
  }
</script>