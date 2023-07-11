<script setup>
 import {computed} from 'vue'
 import {formatAmount} from '../helpers'
 import CircleProgress from 'vue3-circle-progress'
 import "vue3-circle-progress/dist/circle-progress.css"

 const props = defineProps({
    budget:{
        type:Number,
        required:true
    },
    available:{
        type:Number,
        required:true
    },
    spent:{
        type:Number,
        required:true
    }
 })

 const emit = defineEmits(['reset-app'])


 //COMPUTED

 const percent = computed(()=>{
    
    //((presupuesto - disponible) / presupuesto) * 100  - Regla de tres
    return parseInt(((props.budget -props.available) / props.budget) * 100)

 })

</script>
 
<template>
 <div>
    <v-row class="ma-0 d-flex justify-center">
        <v-col cols="12" sm="12" md="6" lg="6" class="d-flex justify-center">
            <div style="position: relative;">
                <span class="percent-display" :class="percent >= 90 ? 'text-red-darken-4' : 'text-grey-lighten-1'">{{ percent }}%</span>
                <CircleProgress
                    :percent="percent"
                    :size="200"
                    :border-width="25"
                    :border-bg-width="25"
                    fill-color="#00796B"
                    empty-color="#f1f1f1"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="6">
            <v-row class="ma-0 d-flex justify-center">
                <v-hover>
                    <template v-slot:default="{isHovering, props}">
                        <v-btn
                            v-bind="props"
                            class="text-none reset-app rounded-xl"
                            width="90%"
                            :color="isHovering ? 'red-darken-4' : 'teal-darken-2'"
                            @click="emit('reset-app')"
                            flat>Resetear App</v-btn>
                    </template>
                </v-hover>
            </v-row>
            <v-row class="mx-0 mt-10 mb-0 d-flex flex-column align-center">
                <p>Presupuesto: <span>{{ formatAmount(budget)}}</span></p>
                <p>Disponible: <span>{{ formatAmount(available)}}</span></p>
                <p>Gastado: <span>{{ formatAmount(spent) }}</span></p>
            </v-row>
        </v-col>
    </v-row>
 </div>
</template>
 
<style scoped>
 p{
    font-size: 1.3rem;
    color: #00796b;
 }

 p span{
    color: #90a4ae;
 }

.percent-display{
   z-index: 100;
   margin: auto;
   top: calc(50% - 1.2rem);
   left: 0;
   right: 0;
   position: absolute;
   text-align: center;
   font-size: 32px;
   font-weight: 600;

}

 @media(width < 600px){
    p{
        font-size: 1rem;
    }

    p span{
        font-size: 1rem;
    }
 }

</style>