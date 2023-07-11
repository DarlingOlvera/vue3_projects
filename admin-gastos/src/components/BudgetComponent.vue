<script setup>
 import {ref} from 'vue'
 import Alert from './AlertComponent.vue'

 const budget = ref(0)
 const error = ref('')

 const emit = defineEmits(['add-budget'])

 const addBudget = () =>{
    if(budget.value <= 0 || budget.value === ''){
        error.value = 'Presupuesto no válido'

        setTimeout(() => {
            error.value = ''
        }, 2000);

        return
    }
    //envia el presupuesto al componente padre
    emit('add-budget',budget.value)
 }
</script>
 
<template>
    <div style="max-width: 700px;" class="mx-auto">
        <form @submit.prevent="addBudget">
            <Alert v-if="error">
                <h6>{{ error }}</h6>
            </Alert>

            <div class="mt-4">
                <v-row class="ma-0 pa-0 d-flex justify-center">
                    <label
                      for="new-budget"
                      class="text-uppercase text-teal-darken-4 text-center"
                      style="font-weight: 600;">Definir presupuesto</label>
                </v-row>
                <v-text-field
                  id="new-budget"
                  variant="outlined"
                  placeholder="Añade tu presupuesto"
                  color="teal-darken-4"
                  class="mt-2"
                  type="number"
                  min="0"
                  v-model.number="budget">
    
                </v-text-field>
            </div>
            <v-row class="ma-0 d-flex justify-center">
                <v-btn color="teal-darken-4" type="submit" size="large" class="rounded-xl text-none">
                    <span>Añadir presupuesto</span>
                </v-btn>
            </v-row>
        </form>
    </div>
</template>
 
<style scoped>

.v-text-field :deep(input){
    text-align: center;
}


</style>