<script setup>
import {ref,reactive,watch,computed,onMounted} from 'vue'
import { useDisplay } from 'vuetify'
import Budget from './components/BudgetComponent.vue'
import Control from './components/BudgetControl.vue'
import Modal from './components/ModalComponent.vue'
import ListExpenses from './components/ListExpenses.vue'
import Filtro from './components/Filtro.vue'
import {createId} from './helpers'


//DATA:
const {smAndDown} = useDisplay()
const newBudget = ref(0)
const available = ref(0)
const modal = ref(false)
const spent = ref(0)
const filter = ref('')
const expense = reactive({
  name:'',
  amount:'',
  category:'',
  id:null,
  date:Date.now()
})
const expenses = ref([])

//WATCH:
watch(expenses,()=>{
  //console.log(expenses.value);
  const totalSpent = expenses.value.reduce((t,el) =>Number(el.amount) + t,0)
  spent.value = totalSpent
  

  localStorage.setItem('expensesArr',JSON.stringify(expenses.value))
},{
  deep:true
})

watch(spent,(newVal)=>{
  if(newVal > 0){
    available.value = newBudget.value - newVal
  }
})

watch(newBudget,()=>{
  localStorage.setItem('budget',newBudget.value)
})


onMounted(() => {
  const budgetStorage = localStorage.getItem('budget')
  const expenesesStorage = localStorage.getItem('expensesArr')
  if(budgetStorage){
    newBudget.value = Number(budgetStorage)
    available.value = Number(budgetStorage)
  }

  if(expenesesStorage){
    expenses.value = JSON.parse(expenesesStorage)
  }
})


//METHODS:
const addNewBudget = (amount)=>{
  //obtiene el presupuesto enviado
  newBudget.value = amount
  available.value = amount
}

const openModal = () =>{
  modal.value = true
}

const closeModal = () =>{
  modal.value = false
  resetValues()
}

const saveAmount = () =>{
  
  //Evitar registros duplicados
  if(expense.id){
    //editando...
    //buscar el objeto a editar en el arreglo a base del id
    console.log('dentro de editar');
    const {id} = expense
    console.log(id);
    //busca el index o posicion donde se encuentra el objeto
    const i = expenses.value.findIndex(el => el.id === id)
    console.log(i);
    expenses.value[i] = {...expense}
  }else{
    console.log('dentro de crear');
    expenses.value.push({
      ...expense,
      id:createId()
    })
  }
  closeModal()
}

const  spentSelection = (id) =>{
  const edit = expenses.value.filter(el => el.id === id)[0]
  Object.assign(expense, edit)
  openModal()
}

const spentDeletion = () =>{
  //console.log('Eliminando...');
  expenses.value = expenses.value.filter(el => el.id != expense.id)
  closeModal()
}
const resetValues = () =>{
  Object.assign(expense,{
    name:'',
    amount:'',
    category:'',
    id:null,
    date:Date.now()
  })
}

const resetApp = () =>{
  localStorage.removeItem('budget')
  localStorage.removeItem('expensesArr')

  expenses.value = []
  newBudget.value = 0
  available.value = 0
}

const filteredData= computed( () => {
  if(filter.value){
    if(filter.value === 'todos'){
      return expenses.value
    }else{
      return expenses.value.filter(el => el.category === filter.value)
    }
  }
  return expenses.value
})

</script>

<template>
  <div>
    <v-layout>
      <v-app-bar flat  class="bg-teal-darken-3 pa-2">
        <h1 class="text-center ma-0">Administra tus gastos</h1>
      </v-app-bar>
      <v-main class="ma-0 pa-0">
        <div id="body" class="mx-auto">
          <Budget
            v-if="newBudget === 0"
            @add-budget="addNewBudget"
          />
          <div
            v-else
            class="mx-auto rounded-lg pa-10"
            style="max-width: 900px;">
            <Control
              :budget="newBudget"
              :available="available"
              :spent="spent"
              @reset-app="resetApp"
            />
          </div>
          <div v-if="newBudget > 0" class="fab-button">
            <v-btn
              icon="fa fa-regular fa-plus"
              flat
              color="teal-darken-2"
              size="large"
              @click="openModal"></v-btn>
          </div>
          <Modal 
            :model="modal"
            @close-modal="closeModal"
            @save-amount="saveAmount"
            @spent-deletion ="spentDeletion"
            :available ="available"
            :id = "expense.id"
            v-model:name="expense.name"
            v-model:amount="expense.amount"
            v-model:category="expense.category"/>
        </div>
        <div id="show-expenses">
          <v-card width="auto"  class="rounded-lg px-10 py-5" :elevation="expenses.length > 0 ? '4' : '0'">
            <v-card-title>
              <h2
                class="text-center mb-5"
                :class="expenses.length <= 0 ? 'text-grey-lighten-2' : 'text-teal-darken-2 font-weight-bold'">
                {{ expenses.length > 0 ? 'Gastos registrados' : 'No hay gastos' }}
              </h2>
            </v-card-title>
            <v-card-text v-if="expenses.length > 0">
              <v-row class="ma-0">
                <Filtro
                  v-model:filter ="filter"
                />
              </v-row>
              <v-row class="d-flex justify-center">
                <v-col cols="12" sm="12" md="4" lg="4"
                    v-for="x in filteredData"
                    :key="x.id"
                    class="d-flex justify-center">
                  <list-expenses
                    :expense="x"
                    @spent-selection ="spentSelection"/>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
      </v-main>
    </v-layout>
  </div>
</template>

<style>
:root{
  font-family: 'Comfortaa';
}

#body{
  padding-top: 200px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 40px;
  max-width: 1500px;
}

#show-expenses{
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
  padding: 40px;
}

h1{
  font-family: 'Comfortaa';
  font-weight: 500;
}

.fab-button{
  position: fixed;
  right: 40px;
  bottom:40px;
  z-index: 9000;
  
  
}
</style>
