<template>
  <q-layout view="lHh Lpr lFf">

    <!-- isso daqui é o header basicamente -->
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar App! </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- Sidebar -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <!-- //aqui é o conteudo -->
    <q-page-container>
      <router-view />
    </q-page-container>


  </q-layout>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

  const linksList: EssentialLinkProps[] = [
    {
      title: 'Tabela de Crud',
      caption: 'Crud completo',
      icon: 'school',
      link: '',
    },
    // {
    //   title: 'teste',
    //   caption: 'github.com/quasarframework',
    //   icon: 'record_voice_over',
    //   link: '#/teste',
    // },

  ];

  export default defineComponent({
    name: 'MainLayout',
    components: {EssentialLink,},
    setup() {
      const leftDrawerOpen = ref(false);
      return {
        linksList,
        leftDrawerOpen,
        toggleLeftDrawer() {
          leftDrawerOpen.value = !leftDrawerOpen.value;
        },
      };
    },
  });
  
</script>