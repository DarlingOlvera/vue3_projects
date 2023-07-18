<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
 <header class="bg-slate-900">
    <div class="mx-auto max-w-6xl py-10">
      <h1 class="text-5xl text-white text-center ">Administrador de clientes</h1>
    </div>
 </header>
  <main class="mx-auto max-w-6xl mt-10">
    <RouterView />
  </main>
</template>

<style>
:root{
  font-family: 'Special Elite';
}


</style>
