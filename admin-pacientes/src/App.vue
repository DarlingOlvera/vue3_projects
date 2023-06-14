<script setup>
import {ref,reactive,watch,onMounted} from 'vue'
import  {uid} from 'uid'
import HeaderC from './components/HeaderComponent.vue';
import Formulario from './components/FormularioComponent.vue'
import Pacient from './components/PacientComponent.vue'

const pacients = ref([])

const pacient = reactive({
    id:null,
    name: '',
    owner:'',
    ownerEmail:'',
    dischargeDate:'',
    sintoms:''
})

const savePacient = ()=>{

  if(pacient.id){
    console.log('editando...');
    const {id} = pacient
    const i = pacients.value.findIndex(el=> el.id === id)
    pacients.value[i] = {...pacient}
  }else{
    //se crea una copia no reactiva para que no se borren los datos
    //al limpiar el formulario
    pacients.value.push({...pacient, id:uid()})
  
  }
  //reset form
  pacient.name = ''
  pacient.owner = ''
  pacient.ownerEmail = ''
  pacient.dischargeDate = ''
  pacient.sintoms = ''
  pacient.id = null
}

//el id se obtiene en el componente PacientComponent
const updatePacient = (id)=>{
  //console.log('actualizando...',id);
  //como el filtro solo regresa uno, con el index 0 regresa el objeto
  const editPacient = pacients.value.filter(el => el.id === id )[0]
  Object.assign(pacient,editPacient)
}

const deletePacient = (id)=>{
  pacients.value = pacients.value.filter(el => el.id !== id)
}

watch(pacients,()=>{
  localStorage.setItem('pacientsStorage',JSON.stringify(pacients.value))
},{
  deep:true
})

onMounted(()=>{
  const data = localStorage.getItem('pacientsStorage')

  if(data){
    pacients.value = JSON.parse(data)
  }
})

</script>

<template>
  <div class="container mx-auto mt-20">
    <HeaderC/>
    <div class="mt-12 md:flex">
      <Formulario 
        v-model:name="pacient.name"
        v-model:owner="pacient.owner"
        v-model:email="pacient.ownerEmail"
        v-model:dischargeDate="pacient.dischargeDate"
        v-model:sintoms="pacient.sintoms"
        :id="pacient.id"
        @save-pacient="savePacient()"/>
      <div class="md:w-1/2 md:h-screen overflow-y-scroll">
        <h3 class="text-3xl text-center text-white font-mono">Administra tus pacientes</h3>
        <div v-if="pacients.length > 0">
          <p class="text-lg mt-5 text-white text-center mb-10">
            Información de
            <span class="text-yellow-200">Pacientes</span>
        </p>
          <Pacient
            v-for="pacient in pacients"
            :pacient="pacient"
            @update-pacient="updatePacient"
            @delete-pacient="deletePacient" />
        </div>
        <p v-else class="mt-20 text-2xl text-center text-yellow-100">No hay pacientes para mostrar</p>
      </div>
    </div>
  </div>
</template>
