<script setup>
import FormWeather from '../components/Form.vue'
import useWeather from '../composables/useWeather'
import WeatherDisplay from '../components/WeatherDisplay.vue';
import Spinner from '../components/Spinner.vue';
import Alert from '../components/Alert.vue';

const {getWeather,weatherData,showWeather, loading, error} = useWeather()

</script>

<template>
  <div class="bg-cover bg-gradient-to-b from-slate-800 to-slate-600 relative 2xl:h-screen">
    <img src="/public/static/background.jpg" class="w-full h-full  object-cover absolute mix-blend-overlay">
    <div class="py-20">
      <h1 class="relative text-white text-5xl font-semibold text-center">Consult the weather</h1>
      <h2 class="relative text-white text-center">Enter a country and a city to know how's the weather there</h2>
    </div>
    <div class="relative">
      <div class="w-1/3 mx-auto p-5">
        <Spinner v-if="loading" />
        <Alert v-if="error">{{ error }}</Alert>
        <WeatherDisplay 
        v-if="showWeather"
        :weather="weatherData" />
      </div>
      <div class="w-1/3 mx-auto">
        <FormWeather
          @get-weather ="getWeather" />
      </div>
    </div>
  </div>
</template>
