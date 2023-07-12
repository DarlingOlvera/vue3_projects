<script setup>
 import {reactive,ref} from 'vue'
 import Alert from './Alert.vue'


 const data = reactive({
    city:'',
    country:''
 })

 const error = ref('')

 const countries = [
    {code:'US', name:'United States'},
    {code:'MX', name:'Mexico'},
    {code:'AR', name:'Argentina'},
    {code:'CO', name:'Colombia'},
    {code:'CR', name:'Costa Rica'},
    {code:'ES', name:'Spain'},
    {code:'PE', name:'Peru'},
 ]

 const emit = defineEmits(['get-weather'])

 //METHODS
 const onSubmit = () =>{
    if(Object.values(data).includes('')){
        error.value = 'All fields are required'
        return
    }

    error.value = ''
    emit('get-weather',data)
 }
</script>
 
<template>
    <form class="py-10 px-5" @submit.prevent="onSubmit">
        <Alert v-if="error">{{ error }}</Alert>
        <div class="mb-5">
            <label 
            for="city" 
            class="block text-white uppercase font-semibold">City</label>
            <input 
            type="text" 
            id="city" 
            placeholder="Enter a city" 
            v-model="data.city"
            class="border-2 w-full p-2 mt-2  rounded-md caret-orange-400 bg-white
                    focus:outline-none focus:border-orange-400 text-gray-600">
        </div>
        <div>
            <label 
            for="country"
            class="block text-white uppercase font-semibold"
            >Country</label>
            <select 
            id="country" 
            v-model="data.country"
            class="border-2 p-2 mt-2 text-gray-600 rounded-md focus:outline-none focus:border-orange-400 w-full bg-white">
                <option value="">-- Select a country --</option>
                <option v-for="c in countries" :key="c.code"  :value="c.code">{{ c.name }}</option>
            </select>
        </div>
        <div class="mx-auto w-1/2">
            <input 
            type="submit" 
            value="Consult"
            class="bg-orange-400 w-full p-3 text-white font-semibold rounded-xl hover:bg-orange-500 cursor-pointer transition-colors mt-10">
        </div>  
    </form>
 
</template>
 
