<script setup>
 import Receta from '../components/Receta.vue';
 import {useBebidasStore} from '../stores/bebidas'

 const bebidasStore = useBebidasStore()

</script>
 
<template>
 <div>
    <h1 class="text-6xl font-bold" style="font-family: 'Dancing Script';">Recipes</h1>
    <p v-if="bebidasStore.noRecetas" class="text-center text-gray-500 text-3xl my-10">Nothing to show</p>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
      <Receta
         v-for="receta in bebidasStore.recetas"
         :receta="receta"
         :key="receta.idDrink"
      />
    </div>
 </div>
</template>
 
<style scoped>
 
</style>