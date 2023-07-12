<script setup>
 import useWeather from '../composables/useWeather';

const props = defineProps({
    weather:{
        type:Object,
        required:true
    }
})
 

const {formatTemp} = useWeather()
</script>
 
<template>
 <div class="bg-white w-full h-[250px] rounded-3xl p-5">
    <h1 class="text-gray-800 text-3xl text-center font-semibold">Weather in: <span class="text-3xl font-normal">{{ weather.name }}</span></h1>
    <h2 class="text-gray-800 text-5xl text-center mt-10">{{ formatTemp(weather.main.temp) }}<span>&deg;C</span> </h2>
    <div class="text-xl text-gray-800 h-1/2 w-full flex items-center justify-center">
        <!--TODO: terminar el diseño -->
        <p>Min: {{ formatTemp(weather.main.temp_min) }} <span>&deg;C</span></p>
        <p class="ml-4">Max: {{ formatTemp(weather.main.temp_max) }}<span>&deg;C</span></p>
        
    </div>
 </div>
</template>

