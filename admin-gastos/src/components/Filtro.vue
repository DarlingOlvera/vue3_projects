<script setup>
 import {ref} from 'vue'

 const data = ref([
    {name:'Todos',value:'todos'},
    {name:'Ahorro',value:'Ahorro'},
    {name:'Comida',value:'Comida'},
    {name:'Casa',value:'Casa'},
    {name:'Ocio',value:'Ocio'},
    {name:'Salud',value:'Salud'},
    {name:'Gastos varios',value:'Gastos'},
    {name:'Suscripciones',value:'Suscripciones'}
 ])

 const emit = defineEmits(['update:filter','filter-data'])  
 const props = defineProps(['filter'])

 const updateFilter = (newVal) =>{
   emit('update:filter',newVal)
 }
</script>
 
<template>
 <div style="width: 300px;margin-top: 60px;">
    <label for="category" class="text-uppercase text-teal-darken-3 mb-5">Filtrar:</label>
    <v-select
        id="category"
        color="teal-darken-2"
        variant="outlined"
        density="comfortable"
        label="Seleccione la categoría"
        :items="data"
        item-title="name"
        item-value="value"
        :value="filter"
        @update:model-value="updateFilter"
        ></v-select>
 </div>
</template>
 
<style scoped>
 
</style>