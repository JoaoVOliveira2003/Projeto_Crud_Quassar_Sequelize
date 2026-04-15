<template>
    <div class="row" style="height: 100vh;">
        <div class="col-6 bg-grey-2 flex flex-center">
            <img style="" src="../assets/imgs/shallows.png" alt="">
        </div>


        <div class="col-6 flex flex-center">
            <div style="width: 300px;">
                <h4>Login</h4>
                <q-form filled greedy @submit.prevent="realizarLogin()">
                    <q-input v-model="formulario.email" label="Email" />
                    <q-input v-model="formulario.senha" label="Senha" />
                    <q-btn label="Entrar" color="primary" class="full-width q-mt-md" type="submit" />
                    <div class="text-center q-mt-md">
                        <router-link to="/cadastro">Não possuo conta</router-link>
                    </div>

                </q-form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import type { loginInterface } from '../../interfaces/loginInterface'
// import { validarObjeto } from 'src/utils/validacao/validacao'
import { login } from '../../services/Login/realizarLogin'
import { useRouter } from 'vue-router'
const router = useRouter()

const formulario = reactive({
    email: '',
    senha: ''
});

async function realizarLogin() {

    const dadosLogin: loginInterface = {
        email: formulario.email,
        senha: formulario.senha
    }

    try {
        const res = await login(dadosLogin);
        if (res == 0) {
            alert('Senha ou Email incorreto');
        }
        else if (res == 1) {
            router.push('/')
        }
    }
    catch (error) {
        alert(error);
    }
}


</script>