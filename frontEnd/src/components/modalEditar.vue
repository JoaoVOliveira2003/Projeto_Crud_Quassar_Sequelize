<template>
    <q-dialog v-model="dialogVisible" transition-show="scale" transition-hide="scale" @before-hide="limparModal">
        <q-card style="min-width: 350px">
            <q-card-section>
                <div class="text-h6">Editar usuário</div>

                <q-form ref="formEditarRef">
                    <!-- Nome -->
                    <q-input v-model="formularioLocal.nome" label="Nome" :rules="[
              val => !!val || 'Nome é obrigatório',
              val => val.length >= 3 || 'Nome deve ter pelo menos 3 caracteres'
            ]" clearable hide-bottom-space />

                    <!-- Data -->
                    <q-input type="date" v-model="formularioLocal.dataDeNascimento" label="Data"
                        :rules="[val => !!val || 'Data é obrigatória']" clearable hide-bottom-space />

                    <!-- Peso -->
                    <q-input type="number" v-model.number="formularioLocal.peso" label="Peso (kg)" :rules="[
              val => val !== null || 'Peso é obrigatório',
              val => val > 0 || 'Peso deve ser maior que 0'
            ]" clearable hide-bottom-space />

                    <!-- Altura -->
                    <q-input type="number" v-model.number="formularioLocal.altura" label="Altura (m)" step="0.01"
                        :rules="[
              val => val !== null || 'Altura é obrigatória',
              val => val > 0 || 'Altura deve ser maior que 0',
              val => val < 3 || 'Altura inválida'
            ]" clearable hide-bottom-space />

                    <!-- Rua -->
                    <q-input v-model="formularioLocal.rua" label="Rua" :rules="[val => !!val || 'Rua é obrigatória']"
                        clearable hide-bottom-space />

                    <!-- Número -->
                    <q-input type="number" v-model.number="formularioLocal.numero" label="Número" :rules="[
              val => val !== null || 'Número é obrigatório',
              val => val > 0 || 'Número inválido'
            ]" clearable hide-bottom-space />

                    <!-- Cidade -->
                    <CidadeSelect v-model="formularioLocal.cidadeSelecionada" />
                </q-form>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="secondary" v-close-popup />
                <q-btn flat label="Salvar" color="primary" @click="validarAntesSalvar" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
    import { ref, reactive, watch, computed } from 'vue'
    import CidadeSelect from 'components/CidadeSelect.vue'

    // Interfaces primeiro
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

    interface DadosUsuario {
        id: number
        nome: string
        dataDeNascimento: string
        peso: number
        altura: number
        endereco: {
            rua: string
            numero: number
            cod_cidade: number
        }
    }

    // Props
    const props = defineProps<{
        modeloAberto: boolean
        usuario?: Usuario | null
    }>()

    // Emits (sintaxe corrigida)
    const emit = defineEmits<{
        'update:modeloAberto': [value: boolean]
        'salvar': [dados: DadosUsuario]
    }>()

    const dialogVisible = computed({
        get: () => props.modeloAberto,
        set: (val) => emit('update:modeloAberto', val)
    })

    const formEditarRef = ref()

    const formularioLocal = reactive({
        id: 0,
        nome: '',
        dataDeNascimento: '',
        peso: 0,
        altura: 0,
        rua: '',
        numero: 0,
        cidadeSelecionada: 0
    })

    watch(() => props.modeloAberto, (abriu) => {
        if (abriu && props.usuario) {
            preencherFormulario(props.usuario)
        }
    })

    function preencherFormulario(usuario: Usuario) {
        const endereco = usuario.endereco?.[0]

        formularioLocal.id = usuario.id
        formularioLocal.nome = usuario.nome
        formularioLocal.peso = usuario.peso
        formularioLocal.altura = usuario.altura
        formularioLocal.dataDeNascimento = usuario.dataDeNascimento
            ? usuario.dataDeNascimento.split('T')[0]
            : ''
        formularioLocal.rua = endereco?.rua || ''
        formularioLocal.numero = endereco?.numero || 0
        formularioLocal.cidadeSelecionada = endereco?.cod_cidade || 0
    }

    function limparModal() {
        formularioLocal.id = 0
        formularioLocal.nome = ''
        formularioLocal.dataDeNascimento = ''
        formularioLocal.peso = 0
        formularioLocal.altura = 0
        formularioLocal.rua = ''
        formularioLocal.numero = 0
        formularioLocal.cidadeSelecionada = 0
    }

    async function validarAntesSalvar() {
        const valido = await formEditarRef.value.validate()

        if (!valido || !formularioLocal.cidadeSelecionada) {
            alert('Corrija os campos do modal.')
            return
        }

        const dadosParaEnviar = {
            id: formularioLocal.id,
            nome: formularioLocal.nome,
            dataDeNascimento: formularioLocal.dataDeNascimento,
            peso: formularioLocal.peso,
            altura: formularioLocal.altura,
            endereco: {
                rua: formularioLocal.rua,
                numero: formularioLocal.numero,
                cod_cidade: formularioLocal.cidadeSelecionada
            }
        }

        console.log('📦 Dados convertidos para enviar:', dadosParaEnviar)
        emit('salvar', dadosParaEnviar)
    }
</script>