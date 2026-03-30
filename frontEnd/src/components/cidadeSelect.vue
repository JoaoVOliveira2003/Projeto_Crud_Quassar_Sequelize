<template>
<q-select
  class="q-mt-5 q-mb-5"
  filled
  :options="cidades"
  v-model="internalValue"
  label="Selecione cidade"
  option-label="desc_cidade"
  option-value="cod_cidade"
  @update:model-value="val => emits('update:modelValue', val)"
/>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue';
import axios from 'axios';

interface Cidade {
  cod_cidade: number;
  desc_cidade: string;
}

const props = defineProps({
  modelValue: { type: Number, default: null }
});

const emits = defineEmits(['update:modelValue']);
const cidades = ref<Cidade[]>([]);
const internalValue = ref(props.modelValue);

watch(() => props.modelValue, val => {
  internalValue.value = val;
});

onMounted(async () => {
  await axios.get('')
  // try {
  //   const res = await axios.get('http://localhost:3000/getCidades');
  //   cidades.value = res.data;
  // } catch (error) {
  //   alert('Erro ao carregar cidades: ' + error);
  // }
});
</script>