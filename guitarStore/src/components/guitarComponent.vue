<script setup>
import {ref} from 'vue'

const  number = ref(0)

//se pasan datos/estdos de un componente padre a un componente hijo mediante props
const props = defineProps({
  guitar:{
    type:Object,
    required:true
  }  
})

//se pasan datos/estados de un componente hijo a un componente padre mediante emits
const emit = defineEmits(['add-to-car'])

</script>

<template>
    
<div class="col-md-6 col-lg-4 my-4 row align-items-center">
    <div class="col-4">
        <img class="img-fluid" :src="'/img/' + guitar.imagen + '.jpg'" :alt="'imagen guitarra ' + guitar.nombre">
    </div>
    <div class="col-8">
        <h3 class="text-black fs-4 fw-bold text-uppercase">{{ guitar.nombre }}</h3>
        <p>{{ guitar.descripcion }}</p>
        <p class="fw-black text-primary fs-3">${{ guitar.precio }}</p>
        <!--En el emit se pone el nombre del evento seguido de lo que se quiere enviar-->
        <button 
            type="button"
            class="btn btn-dark w-100"
            @click="emit('add-to-car',guitar)"
        >Agregar al Carrito</button>
    </div>
</div><!-- FIN GUITARRA -->
           
</template>
