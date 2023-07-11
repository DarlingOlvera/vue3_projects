<script setup>
 import {computed,ref} from 'vue'
 import Alert from './AlertComponent.vue'

 const props = defineProps({
    model:{
        type:Boolean,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    amount:{
        type:[String,Number],
        required:true
    },
    category:{
        type:String,
        required:true
    },
    available:{
        type: Number,
        required:true
    },
    id:{
        type:[String, null],
        required:true
    }
 })

 const emit = defineEmits(['close-modal','update:name','update:amount','update:category','save-amount','spent-deletion'])

 const error = ref('')

 //emits para actualizar props
 const updateName = (newVal) =>{
    emit('update:name',newVal)
 }
 const updateAmount = (newVal) =>{
    emit('update:amount',newVal)
 }
 const updateCategory = (newVal) =>{
    emit('update:category',newVal)
 }


 const show = computed({
    get(){
        return props.model
    },set(newVal){
        if(!newVal){
            emit('close-modal')
        }
    }      
 })

 const categories = ref([
    {name:'Ahorro',value:'Ahorro'},
    {name:'Comida',value:'Comida'},
    {name:'Casa',value:'Casa'},
    {name:'Ocio',value:'Ocio'},
    {name:'Salud',value:'Salud'},
    {name:'Gastos varios',value:'Gastos'},
    {name:'Suscripciones',value:'Suscripciones'}
 ])

 const oldAmount = props.amount

const onSubmit = () =>{

    const {name, amount,category,available, id} = props
    //validar que los campos estén vacios
    if([name,amount,category].includes('')){
        error.value = 'Todos los campos son obligatorios'

        setTimeout(() => {
            error.value = ''
        }, 2000);

        return
    }

    //validar que la cantidad sea mayor a 0
    if(amount <= 0){
        error.value = 'Cantidad no válida'

        setTimeout(() => {
            error.value = ''
        }, 2000);

        return
    }

    //validar que el usuario no gaste más que su presupuesto

    if(id){
        //Cuando se está editando el gasto

        //Tomar en cuenta el gasto ya realizado
        if(amount > oldAmount + available){
            error.value = 'Has excedido tu presupuesto'
            setTimeout(() => {
                error.value = ''
            }, 2000);
    
            return
        }
    }else{
        if(amount > available){
            error.value = 'Has excedido tu presupuesto'
    
            setTimeout(() => {
                error.value = ''
            }, 2000);
    
            return
        }
    }

    console.log('emitiendo correctamente...');
    emit('save-amount')
}
</script>
 
<template>
 <!--* En vuetify 3 esta es la estructura para que el tamaño de v-card y v-dialog sea responsiva-->   
 <v-dialog v-model="show" max-width="700" persistent>
    <v-card elevation="0" class="rounded-xl">
        <form @submit.prevent="onSubmit">
        <v-card-title>
            <v-row class="ma-0 d-flex justify-end">
                <v-icon icon="fa fa-light fa-xmark" size="small" @click="show=false"></v-icon>
            </v-row>
            <h1 class="text-center">{{id ? 'Editar gasto' : 'Añadir nuevo gasto'  }}</h1>
            <Alert v-if="error">{{ error }}</Alert>
        </v-card-title>
        <v-card-text>
                <div>
                    <label for="name" class="text-uppercase text-teal-darken-3">nombre gasto:</label>
                    <v-text-field 
                        id="name"
                        color="teal-darken-2"
                        variant="outlined"
                        :value="name"
                        density="comfortable"
                        placeholder="Añade el nombre del gasto"
                        @update:model-value="updateName"></v-text-field>
                </div>
                <div>
                    <label for="amount" class="text-uppercase text-teal-darken-3">cantidad gasto:</label>
                    <v-text-field 
                        id="amount"
                        color="teal-darken-2"
                        variant="outlined"
                        type="number"
                        :value="amount"
                        density="comfortable"
                        placeholder="Añade la cantidad del gasto"
                        @update:model-value="updateAmount"></v-text-field>
                </div>
                <div>
                    <label for="category" class="text-uppercase text-teal-darken-3">categoría gasto:</label>
                    <v-select
                        id="category"
                        color="teal-darken-2"
                        variant="outlined"
                        density="comfortable"
                        :items="categories"
                        item-title="name"
                        item-value="value"
                        :value="category"
                        placeholder="Seleccionar categoría"
                        @update:model-value="updateCategory"></v-select>
                </div>
            </v-card-text>
            <v-card-actions class="d-flex justify-end">
                <div class="pa-4">
                    <v-btn
                      class="text-none rounded-xl bg-teal-darken-3"
                      size="large"
                      flat
                      type="submit">{{ id ? 'Guardar cambios' : 'Añadir gasto' }}</v-btn>
                      
                    <v-btn
                      class="text-none rounded-xl bg-red"
                      size="large"
                      flat
                      v-if="id"
                      @click="emit('spent-deletion')">Eliminar gasto</v-btn>

                </div>
            </v-card-actions>
        </form>
    </v-card>
 </v-dialog>
</template>
 
<style scoped>
label{
    font-size: .8rem;
    font-weight: 700;
}



@media(width < 600px){
    h1{
        font-size: 1.5rem;
    }
}
</style>