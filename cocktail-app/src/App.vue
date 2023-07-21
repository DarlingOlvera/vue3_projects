<script setup>
  import HeaderComponent from './components/HeaderComponent.vue';
  import { RouterView } from 'vue-router';
  import Modal from './components/Modal.vue';
  import Notificacion from './components/Notificacion.vue';
</script>

<template>
  <header-component/>
  <main class="container mx-auto mt-10" style="max-width: 1500px;">
    <router-view></router-view>
  </main>
  <Modal/>
  <Notificacion/>
</template>
<style>
:root{
  font-family: 'Raleway';
}

</style>
