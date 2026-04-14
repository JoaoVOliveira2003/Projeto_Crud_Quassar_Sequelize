<template>
  <div class="row" style="height: 100vh;">
        <div class="col-6 bg-grey-2 flex flex-center">
            <img style="" src="../assets/imgs/shallows.png" alt="">
        </div>

        <div class="col-6 flex flex-center">
            <div style="width: 300px;">
                <h4>Login</h4>

                <q-input v-model="email" label="Email"/>
                <q-input v-model="senha" label="Senha" type="password"/>

                <q-btn label="Entrar" color="primary" class="full-width q-mt-md"/>

                <div class="text-center q-mt-md">
                    <router-link to="/cadastro">
                        Não possuo conta
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

</script>