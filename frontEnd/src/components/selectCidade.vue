<template>
  <q-select 
    class="q-mt-5 q-mb-5" filled 
    :options="cidades"
    v-model="internalValue"
    label="Selecione cidade"
    option-label="desc_cidade"
    option-value="cod_cidade"
    emit-value
    map-options />
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { listarCidadeService } from '../../services/Cidades/listarCidadeService'
  import type { Cidade } from '../../interfaces/cidadeInterface'

  const props = defineProps < {
    modelValue: number | null
  } > ()

  const emit = defineEmits < {
    'update:modelValue': [value: number | null]
  } > ()

  const cidades = ref < Cidade[] > ([])
  const internalValue = ref < number | null > (props.modelValue)

  watch(() => props.modelValue, (val) => {
    internalValue.value = val
  })


  watch(internalValue, (val) => {
    emit('update:modelValue', val)
  })

  onMounted(async () => {
    cidades.value = await listarCidadeService()
  })
</script>