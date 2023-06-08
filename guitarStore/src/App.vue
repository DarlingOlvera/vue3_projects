<script setup>
import {ref,onMounted,watch} from 'vue'
import {db} from './data/guitars'
import Guitar from './components/guitarComponent.vue'
import HeaderC from './components/headerComponent.vue';
import FooterC from './components/footerComponent.vue'

//reactive's only with objects
/* const state = reactive({
  guitars:db
}) */

const guitars = ref([])
const car = ref([])
const specialGuitar = ref({})

watch(car,()=>{
    saveData()
},{
    //entra a todos los atributos del objeto y los revisa profundamente
    //si el objeto es muy grande, el performance se puede ver comprometido
    deep:true
})

onMounted(() => {
    guitars.value = db
    specialGuitar.value = db[3]

    const carStorage = localStorage.getItem('car')
    if(carStorage){
        //en este caso car es un arreglo por lo que se usa JSON.parse para convertir el string al tipo arreglo
        car.value = JSON.parse(carStorage)
    }

})

const addToCar = (data) =>{
    //evitar elementos duplicados
    //se usa findIndex para verificr si el elemento ya existe en el arreglo
    const exist = car.value.findIndex(el => el.id === data.id)
    //console.log(exist);
    if(exist >= 0){
        //aqui se usa la posicion que ocupa el elemento en el carrito para modificar su cantidad
        car.value[exist].cantidad++
    }else{
        data.cantidad = 1
        car.value.push(data)
    }

}

const increment = (id) =>{
    //console.log('más...');
    const productIndex = car.value.findIndex(el => el.id === id)
    if(car.value[productIndex].cantidad >= 5) return
    car.value[productIndex].cantidad++
}

const decrement = (id) =>{
    //console.log('menos...');
    const productIndex = car.value.findIndex(el => el.id === id)
    if(car.value[productIndex].cantidad <= 1) return
    car.value[productIndex].cantidad--
}

const removeProduct = (id) =>{
    //console.log(id);
    car.value = car.value.filter(el => el.id !== id)
}

const clearCar = () =>{
    car.value = []
}

const saveData = () =>{
    //no se pueden guardar arreglos en el localstorage asi que se usa JSON.stringify para convertirlo a string
    localStorage.setItem('car',JSON.stringify(car.value))
}

</script>

<template>
    <HeaderC
        :car = "car"
        :guitar = "specialGuitar"
        @increment="increment"
        @decrement="decrement"
        @add-to-car="addToCar"
        @remove-product="removeProduct"
        @clear-car="clearCar"
    />

    <main class="container-xl mt-5">
        <h2 class="text-center">Nuestra Colección</h2>
        <div class="row mt-5">
            <Guitar
              v-for="guitar in guitars"
              :key="guitar.nombre"
              :guitar="guitar"
              @add-to-car="addToCar" />
        </div> 
    </main>
    <FooterC/>
</template>

<style scoped>

</style>
