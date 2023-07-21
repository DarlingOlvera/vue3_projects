<script setup>
import {useBebidasStore} from '../stores/bebidas'

    const bebidasStore = useBebidasStore()

    const props = defineProps({
        receta:{
            type:Object
        }
    })
</script>
 
<template>
    <div class="border shadow-lg">
        <div class="overflow-hidden">
            <img 
            :src="receta.strDrinkThumb" 
            :alt="`${receta.strDrink} image `"
            class="hover:scale-125 transition-transform hover:rotate-2">
        </div>
        <div class="p-5">
            <h2 
            class="text-3xl truncate font-semibold"
            style="font-family: 'Dancing Script';">{{ receta.strDrink }}</h2>
            <button
                type="button"
                class="bg-orange-400 mt-5 w-full p-3 font-medium text-white text-lg
                hover:bg-orange-500 transition-colors"
                @click="bebidasStore.seleccionarBebida(receta.idDrink)">See more</button>
        </div>
    </div>
</template>
 