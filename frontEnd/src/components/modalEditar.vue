<template>
    <q-dialog v-model="dialogVisible" transition-show="scale" transition-hide="scale" @before-hide="limparModal">
        <q-card style="min-width: 350px">
            <q-card-section>
                <div class="text-h6 q-mb-md">Editar usuário</div>

                <q-form ref="formEditarRef" greedy>

                    <q-input filled v-model="formularioLocal.nome" label="Nome" class="bordered q-mb-sm" clearable
                        hide-bottom-space lazy-rules :rules="regras.nome" />

                    <q-input filled type="date" v-model="formularioLocal.dataDeNascimento" label="Data de Nascimento"
                        class="bordered q-mb-sm" clearable hide-bottom-space lazy-rules
                        :rules="regras.dataDeNascimento" />

                    <div class="row q-gutter-sm">
                        <div class="col">
                            <q-input filled type="number" v-model.number="formularioLocal.peso" label="Peso (kg)"
                                class="bordered q-mb-sm" clearable hide-bottom-space lazy-rules :rules="regras.peso" />
                        </div>

                        <div class="col">
                            <q-input filled type="number" step="0.01" v-model.number="formularioLocal.altura"
                                label="Altura (m)" class="bordered q-mb-sm" clearable hide-bottom-space lazy-rules
                                :rules="regras.altura" />
                        </div>
                    </div>

                    <div class="row q-gutter-sm">
                        <div class="col">
                            <q-input filled v-model="formularioLocal.rua" label="Rua" class="bordered q-mb-sm" clearable
                                hide-bottom-space lazy-rules :rules="regras.rua" />
                        </div>

                        <div class="col">
                            <q-input filled type="number" v-model.number="formularioLocal.numero" label="Número"
                                class="bordered q-mb-sm" clearable hide-bottom-space lazy-rules
                                :rules="regras.numero" />
                        </div>
                    </div>

                    <CidadeSelect class="q-mb-sm" v-model="formularioLocal.cidadeSelecionada"
                        :rules="regras.cidadeSelecionada" />

                    <div class="row q-gutter-sm">
                        <div class="col">
                            <q-input filled v-model="formularioLocal.email" label="Email" class="bordered q-mb-sm"
                                clearable hide-bottom-space lazy-rules :rules="regras.email" />
                        </div>

                        <div class="col">
                            <q-input filled v-model="formularioLocal.senha" label="Senha" type="password" class="bordered q-mb-sm" clearable hide-bottom-space lazy-rules :rules="regras.senha" />
                        </div>
                    </div>

                </q-form>
            </q-card-section>

            <q-card-actions align="right" class="q-mt-sm">
                <q-btn label="Cancelar" color="secondary" flat v-close-popup />
                <q-btn label="Salvar" color="secondary" @click="validarAntesSalvar" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import CidadeSelect from './cidadeSelect.vue'
import type { DadosUsuario, Usuario } from '../../interfaces/usuarioInterface'
import { regras } from 'src/utils/validacao/regras'
import { validarObjeto } from 'src/utils/validacao/validacao'


const props = defineProps<{
    modeloAberto: boolean,
    usuario?: Usuario | null
}>()

const emit = defineEmits<{
    'update:modeloAberto': [value: boolean],
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
    cidadeSelecionada: 0,
    email: '',
    senha: '',
})

//observar mudanças em uma variável
watch(() => props.modeloAberto, (abriu) => {
    if (abriu && props.usuario) {
        preencherFormulario(props.usuario)
    }
})

function preencherFormulario(usuario: Usuario) {
    const endereco = usuario.endereco?.[0]  
    const login = usuario.login?.[0]

    formularioLocal.email = login?.email || ''
    formularioLocal.senha = login?.senha || ''
    formularioLocal.id = usuario.id
    formularioLocal.nome = usuario.nome
    formularioLocal.peso = usuario.peso
    formularioLocal.altura = usuario.altura
    formularioLocal.dataDeNascimento = usuario.dataDeNascimento?.split('T')[0] ?? ''
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

    const erros = validarObjeto(dadosParaEnviar)

    if (erros.length > 0) {
        alert(erros.join('\n'))
        return
    }

    emit('salvar', dadosParaEnviar)
}
</script>