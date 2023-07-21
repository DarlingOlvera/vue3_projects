<script setup>
 import { RouterLink,useRoute } from 'vue-router';
 import {useBebidasStore} from '../stores/bebidas'
 import {useNotificacionStore} from '../stores/notificaciones'
 
 
 const route = useRoute()
 const store = useBebidasStore()
 const notificacion = useNotificacionStore()

 const handleSubmit = () =>{
    
    if(Object.values(store.busqueda).includes('')){

        notificacion.text = 'All fields are required'
        notificacion.show  = true
        notificacion.error = true

        setTimeout(() => {
            notificacion.reset()
        }, 3000);

        return
    }
    store.obtenerRecetas()
 }
</script>
 
<template>
    <header class="bg-slate-800" :class="[route.name == 'home' ? 'header-img' : '']">
        <div class="mx-auto container px-5 py-16">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink :to="{name:'home'}">
                        <img src="/public/img/logo.svg" alt="logotipo" class="w-32" >
                    </RouterLink>
                </div>
                <nav class="flex gap-4">
                    <RouterLink  
                    :to="{name:'home'}" 
                    class="text-white uppercase font-semibold"
                    active-class="activo"
                    >
                        Home 
                    </RouterLink>
                    <RouterLink  
                    :to="{name:'favoritos'}" 
                    class="text-white uppercase font-semibold"
                    active-class="activo"
                    >
                        Favorites
                    </RouterLink>
                </nav>
            </div>
            <form 
            v-if="route.name == 'home'"
            class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-20 p-10 rounded-lg shadow space-y-6"
            @submit.prevent="handleSubmit">
                <div class="space-y-2">
                    <label class="block text-white uppercase font-bold text-lg" for="ingrediente">Name or ingredients</label>
                    <input 
                        type="text" 
                        id="ingrediente"
                        class="p-3 w-full rounded-lg focus:outline-none caret-orange-400 text-gray-500 bg-white"
                        placeholder="Ingredient name: ej. Vodka, Tequila, etc"
                        v-model="store.busqueda.nombre">
                </div>
                <div class="space-y-2">
                    <label class="block text-white uppercase font-bold text-lg" for="categoria">Category</label>
                    <select 
                        id="categoria"
                        class="p-3 w-full rounded-lg focus:outline-none text-gray-500 bg-white"
                        v-model="store.busqueda.categoria"
                    >
                        <option value="">-- Select one  --</option>
                        <option 
                            v-for="categoria in store.categorias" 
                            :key="categoria.strCategory"
                            :value="categoria.strCategory">{{ categoria.strCategory }}</option>
                </select>
                </div>

                <input 
                type="submit" 
                class="bg-orange-700 hover:bg-orange-800 cursor-pointer
                 text-white uppercase font-semibold px-3 py-2 w-full rounded-xl"
                value="Search recipes">

            </form>
        </div>
    </header>
</template>
<style scoped>
.header-img{
    background-image:url('/public/img/bg.jpg') ;
    background-size: cover;
    background-position: center;
}
.activo{
    color:#F97316;
}
</style>
 
