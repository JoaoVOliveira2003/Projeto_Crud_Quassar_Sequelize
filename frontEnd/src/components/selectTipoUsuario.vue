<template>
  <q-select 
    class="q-mt-5 q-mb-5" filled 
    :options="cidades"
    v-model="internalValue"
    label="Selecione tipo de usuario"
    option-label="desc_tipo_usuario"
    option-value="id_tipo_usuario"
    emit-value
    map-options />
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { carregarTiposUsuarios } from '../../services/TiposUsuario/listarTiposUsuarios'
  import type { tipoUsuarioInterface } from '../../interfaces/tipoUsuarioInterface'

  const props = defineProps < {
    modelValue: number | null
  } > ()

  const emit = defineEmits < {
    'update:modelValue': [value: number | null]
  } > ()

  const cidades = ref < tipoUsuarioInterface[] > ([])
  const internalValue = ref < number | null > (props.modelValue)

  watch(() => props.modelValue, (val) => {
    internalValue.value = val
  })


  watch(internalValue, (val) => {
    emit('update:modelValue', val)
  })

  onMounted(async () => {
    cidades.value = await carregarTiposUsuarios()
  })
</script>