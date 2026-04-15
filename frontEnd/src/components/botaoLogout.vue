<template>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn label="Logout" @click="logout()" />
    </q-page-sticky>
</template>
<script setup lang="ts">

import { useRouter } from 'vue-router';
const router = useRouter();
import axios from 'axios';

function logout() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    router.push('/login');
}
</script>