<template>
  <q-input
    filled
    v-model="model"
    :type="mostrar ? 'text' : 'password'"
    :label="label"
    clearable
    hide-bottom-space
    lazy-rules
    :rules="rules"
    autocomplete="current-password"
  >
    <template v-slot:append>
      <q-icon
        :name="mostrar ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="mostrar = !mostrar"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

 /* eslint-disable */
type Regra = (val: unknown) => true | string

const props = defineProps<{
  modelValue: string
  label?: string
  rules?: Regra[] | undefined
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const mostrar = ref(false)

const model = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val)
})
</script>