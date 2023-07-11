<script setup>
 import {formatAmount,formatDate} from '../helpers'

 const props = defineProps({
    expense:{
        type:Object,
        required:true
    }
 })

 const emit = defineEmits(['spent-selection'])

// usando diccionario para mostrar el icono segun la categoria

const iconDir ={
    Ahorro:'fa fa-solid fa-circle-dollar-to-slot',
    Comida:'fa fa-solid fa-bowl-rice',
    Casa:'fa fa-solid fa-house',
    Ocio:'fa fa-solid fa-gamepad',
    Salud:'fa fa-solid fa-kit-medical',
    Gastos:'fa fa-solid fa-receipt',
    Suscripciones:'fa fa-solid fa-credit-card'
}

const colorDir = {
    Ahorro:'yellow',
    Comida:'brown-lighten-2',
    Casa:'orange-darken-1',
    Ocio:'cyan',
    Salud:'red',
    Gastos:'light-green',
    Suscripciones:'deep-purple-darken-1' 
}



</script>
 
<template>
    <div class="py-5">
       <v-row>
            <v-col cols="2" class="d-flex justify-center align-center">
                <v-icon :icon="iconDir[expense.category]" size="x-large" :color="colorDir[expense.category]"></v-icon>
            </v-col>
            <v-col cols="10">
                <div class="ml-5">
                    <v-row>
                        <h3 class="text-overline font-weight-bold" :class="`text-${colorDir[expense.category]}`">{{ expense.category == 'Gastos' ? 'Gastos varios' : `${expense.category}` }}</h3>
                    </v-row>
                    <v-row>
                        <span @click="emit('spent-selection',expense.id)" class="hovering">{{ expense.name }}</span>
                    </v-row>
                    <v-row>
                        Costo: {{ formatAmount(expense.amount) }}
                    </v-row>
                    <v-row>
                     {{ formatDate(expense.date) }}
                    </v-row>
                </div>
            </v-col>
       </v-row> 
    </div>
</template>
 
<style scoped>
 .hovering:hover{
    cursor: pointer;
    font-weight: 700;

 }
</style>