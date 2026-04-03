<template>
    <div class="q-pa-md" style="max-width: 600px; margin: auto;">
        <!-- FORMULÁRIO PRINCIPAL -->
        <q-form ref="formRef" @submit.prevent="createUsuarioTodosDados">

            <!-- Nome -->
            <q-input filled v-model="formularioPrincipal.nome" label="Nome" class="bordered q-mb-sm"
                placeholder="Digite seu nome" clearable hide-bottom-space :rules="[
          val => !!val || 'Nome é obrigatório',
          val => val.length >= 3 || 'Nome deve ter pelo menos 3 caracteres'
        ]" />

            <!-- Data -->
            <q-input filled v-model="formularioPrincipal.dataDeNascimento" label="Data de Nascimento" type="date"
                class="bordered q-mb-sm" clearable hide-bottom-space
                :rules="[ val => !!val || 'Data é obrigatória' ]" />

            <div class="row q-gutter-sm">
                <!-- Peso -->
                <div class="col">
                    <q-input filled v-model.number="formularioPrincipal.peso" label="Peso (kg)" type="number"
                        class="bordered q-mb-sm" clearable hide-bottom-space @keypress="limparCampoPeso" :rules="[
              val => val !== null || 'Peso é obrigatório',
              val => val > 0 || 'Peso deve ser maior que 0',
              val => val < 500 || 'Peso inválido'
            ]" />
                </div>

                <!-- Altura -->
                <div class="col">
                    <q-input filled v-model.number="formularioPrincipal.altura" label="Altura (m)" type="number"
                        step="0.01" class="bordered q-mb-sm" clearable hide-bottom-space :rules="[
              val => val !== null || 'Altura é obrigatória',
              val => val > 0 || 'Altura deve ser maior que 0',
              val => val < 3 || 'Altura inválida'
            ]" />
                </div>
            </div>

            <div class="row q-gutter-sm">
                <!-- Rua -->
                <div class="col">
                    <q-input filled v-model="formularioPrincipal.rua" label="Rua" placeholder="Digite sua rua" clearable
                        hide-bottom-space :rules="[ val => !!val || 'Rua é obrigatória' ]" />
                </div>

                <!-- Número -->
                <div class="col">
                    <q-input filled v-model.number="formularioPrincipal.numero" label="Número" type="number" clearable
                        hide-bottom-space
                        :rules="[ val => val !== null || 'Número é obrigatório', val => val > 0 || 'Número inválido' ]" />
                </div>
            </div>

            <br>

            <!-- Cidade -->
            <CidadeSelect v-model="formularioPrincipal.cidadeSelecionada" />

            <div class="q-mt-md">
                <q-btn color="secondary" label="Gravar" type="submit" />
            </div>

        </q-form>

        <hr />

        <!-- Tabela de usuários -->
        <q-table title="Usuários" :rows="usuarios" :columns="colunas" row-key="id">
            <template v-slot:body-cell-acoes="props">
                <q-td align="center">
                    <q-btn color="primary" class="q-mr-sm" size="sm" @click="abrirModalEditar(props.row)">
                        Editar
                    </q-btn>
                    <q-btn color="negative" size="sm" @click="abrirModalDeletar(props.row)">
                        Deletar
                    </q-btn>
                </q-td>
            </template>
        </q-table>

        <!-- Modal de edição -->
        <ModalEditar v-model:modeloAberto="modalAberto" :usuario="usuarioParaEditar" @salvar="atualizarUsuario" />


        <!-- Modal de deletar -->
        <ModalDeletar v-model:modeloAberto="modalDeletarAberto" :usuario="usuarioParaDeletar"
            @confirmarDelete="confirmarDelete" />


    </div>
</template>

<script setup lang="ts">
    import ModalDeletar from 'components/ModalDeletar.vue';
    import ModalEditar from 'components/ModalEditar.vue';
    import CidadeSelect from 'components/CidadeSelect.vue';
    import { ref, reactive, onMounted } from 'vue';
    import { carregarUsuarios } from '../../services/Usuarios/listarUsuarioService';
    import axios from 'axios';

    interface DadosUsuario {
        id: number;
        nome: string;
        dataDeNascimento: string;
        peso: number;
        altura: number;
        rua: string;
        numero: number;
        cidadeSelecionada: number;
    }

    const formRef = ref();
    const usuarioParaEditar = ref < Usuario | null > (null);

    const formularioPrincipal = reactive({
        nome: '',
        dataDeNascimento: '',
        peso: null as number | null,
        altura: null as number | null,
        rua: '',
        numero: null as number | null,
        cidadeSelecionada: null as number | null
    });


    const usuarios = ref < Usuario[] > ([]);
    const usuarioParaDeletar = ref < Usuario | null > (null);

    const modalAberto = ref(false);
    const modalDeletarAberto = ref(false);

    const colunas = [
        { name: 'id', label: 'ID', field: 'id', sortable: true },
        { name: 'nome', label: 'Nome', field: 'nome', sortable: true },
        { name: 'acoes', label: 'Ações', align: '' }
    ];

    onMounted(async () => {
        usuarios.value = await carregarUsuarios();
    });

    async function createUsuarioTodosDados() {
        const valido = await formRef.value.validate();
        if (!valido || !formularioPrincipal.cidadeSelecionada) {
            alert('Corrija os campos.');
            return;
        }

        const usuario = {
            nome: formularioPrincipal.nome,
            dataDeNascimento: formularioPrincipal.dataDeNascimento,
            peso: formularioPrincipal.peso,
            altura: formularioPrincipal.altura,
            endereco: {
                rua: formularioPrincipal.rua,
                numero: formularioPrincipal.numero,
                cod_cidade: formularioPrincipal.cidadeSelecionada
            }
        };

        try {
            const res = await axios.post('http://localhost:3000/usuario/criarUsuario/', { usuario }, { headers: { 'Content-Type': 'application/json' } });

            await atualizarFormulario();

            alert('Novo usuário criado: ' + (res.data.nome || formularioPrincipal.nome));

            // Limpa o formulário principal após criar
            await limparFormularioPrincipal();
            formRef.value.resetValidation();
        } catch (error) {
            console.error(error);
            alert('Erro ao criar usuário: ' + (error.response?.data?.erro || error.message));
        }
    }

    function limparFormularioPrincipal() {
        formularioPrincipal.nome = '';
        formularioPrincipal.dataDeNascimento = '';
        formularioPrincipal.peso = null;
        formularioPrincipal.altura = null;
        formularioPrincipal.rua = '';
        formularioPrincipal.numero = null;
        formularioPrincipal.cidadeSelecionada = null;
        if (formRef.value) {
            formRef.value.resetValidation();
        }

    }


    async function atualizarUsuario(dados: DadosUsuario) {

        const usuario = {
            nome: dados.nome,
            dataDeNascimento: dados.dataDeNascimento,
            peso: dados.peso,
            altura: dados.altura,
            endereco: {
                rua: dados.rua,
                numero: dados.numero,
                cod_cidade: dados.cidadeSelecionada
            }
        };

        try {
            await axios.put(`http://localhost:3000/usuario/atualizarUsuario/${dados.id}`, { usuario },
                { headers: { "Content-Type": "application/json" } }
            );
            modalAberto.value = false;
            await atualizarFormulario();
            alert('Usuário atualizado com sucesso');
            usuarioParaEditar.value = null;
        } catch (error) {
            console.log(error);
            alert("Erro ao atualizar usuário");
        }
    }

    async function atualizarFormulario() {
        // Apenas recarrega a tabela, sem afetar o formulário principal
        usuarios.value = await carregarUsuarios();
    }

    async function confirmarDelete() {
        if (!usuarioParaDeletar.value) return;

        try {
            await axios.delete(`http://localhost:3000/usuario/deletarUsuario/${usuarioParaDeletar.value.id}`);
            await atualizarFormulario();
            modalDeletarAberto.value = false;
            alert('Usuário deletado com sucesso');
            usuarioParaDeletar.value = null;
        } catch (error) {
            console.error(error);
            alert('Erro ao deletar usuário');
        }
    }

    function abrirModalEditar(row: Usuario) {
        usuarioParaEditar.value = row;  // APENAS ISSO!
        modalAberto.value = true;
    }


    function abrirModalDeletar(row: Usuario) {
        usuarioParaDeletar.value = row;
        modalDeletarAberto.value = true;
    }

    function limparCampoPeso(event: KeyboardEvent) {
        if (event.key === ',' || event.key === '.' || !/[0-9]/.test(event.key)) event.preventDefault();
    }

    // Interface para o tipo Usuario (ajuste conforme sua necessidade)
    interface Usuario {
        id: number;
        nome: string;
        peso: number;
        altura: number;
        dataDeNascimento: string;
        rua?: string;
        numero?: number;
        cidadeSelecionada?: number;
        endereco?: Array<{
            rua: string;
            numero: number;
            cod_cidade: number;
        }>;
    }
</script>