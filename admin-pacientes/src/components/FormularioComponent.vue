<script setup>
 import {reactive,computed} from 'vue'
 import Alert from './AlertComponent.vue'
/* const petName        = ref('')
const ownerName         = ref('')
const ownerEmail        = ref('')
const dischargeDate     = ref(null)
const sintoms           = ref('') */



const alert = reactive({
    message:'',
    type:''
})

const props = defineProps({
    id:{
        type:[String,null],
        required:true
    },
    name:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    dischargeDate:{
        type:String,
        required:true
    },
    sintoms:{
        type:String,
        required:true
    },
})

const emit = defineEmits(['update:name','update:owner','update:email','update:discharge-date','update:sintoms','save-pacient'])

const validate = () =>{

    if(Object.values(props).includes('')){
        alert.message = 'Todos los campos son obligatorios'
        alert.type = 'error'
        return
    }
    
    emit('save-pacient')
    alert.message = 'Guardado correctamente'
    alert.type = 'success'

    setTimeout(() => {
        Object.assign(alert,{
            message:'',
            type:'',
        })
    }, 2000);
}

const editing = computed(()=>{
    return props.id
})
</script>
 
<template>
    <div class="md:w-1/2">
        <h2 class="text-3xl text-center text-white font-mono">Seguimiento de pacientes</h2>
        <p class="text-lg mt-5 text-white text-center mb-10">
            Añade Pacientes y
            <span class="text-yellow-200">Adminístralos</span>
        </p>
        <Alert v-if="alert.message" :alert="alert" />
        <form class="bg-white shadow-md rounded-lg py-10 px-5 mb-10" @submit.prevent="validate()">
            <div class="mb-5">
               <label for="pet" class="block text-gray-600 uppercase font-bold">
                Nombre mascota
               </label> 
               <input
                 type="text"
                 id="pet"
                 placeholder="Nombre de la mascota"
                 :value="name"
                 @input="emit('update:name',$event.target.value)"
                 class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md caret-yellow-500 
                 focus:outline-none focus:border-yellow-500">
            </div>
            <div class="mb-5">
               <label for="owner" class="block text-gray-600 uppercase font-bold">
                Nombre Propietario
               </label> 
               <input
                 type="text"
                 id="owner"
                 :value="owner"
                 @input="emit('update:owner',$event.target.value)"
                 placeholder="Nombre del propietario"
                 class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md 
                 focus:outline-none focus:border-yellow-500">
            </div>
            <div class="mb-5">
               <label for="email" class="block text-gray-600 uppercase font-bold">
                Email Propietario
               </label> 
               <input
                 type="email"
                 id="email"
                 :value="email"
                 @input="emit('update:email',$event.target.value)"
                 placeholder="Email del propietario"
                 class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md 
                 focus:outline-none focus:border-yellow-500">
            </div>
            <div class="mb-5">
               <label for="dischargeDate" class="block text-gray-600 uppercase font-bold">
                Alta
               </label> 
               <input
                 type="date"
                 id="dischargeDate"
                 :value="dischargeDate"
                 @input="emit('update:discharge-date',$event.target.value)"
                 class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md 
                 focus:outline-none focus:border-yellow-500">
            </div>
            <div class="mb-5">
               <label for="sintoms" class="block text-gray-600 uppercase font-bold">
                Síntomas
               </label> 
               <textarea
                 id="sintoms"
                 :value="sintoms"
                 @input="emit('update:sintoms',$event.target.value)"
                 class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md h-40 caret-yellow-500 
                 focus:outline-none focus:border-yellow-500" />
            </div>
            <input
              type="submit"
              class="bg-yellow-400 w-full p-3 text-white uppercase font-bold rounded-3xl hover:bg-yellow-500 cursor-pointer transition-colors"
              :value="editing ? 'Guardar cambios' : 'Registrar paciente'">
        </form>
    </div>
</template>
 