import axios from 'axios'
import {ref, computed} from 'vue'

export default function useWeather(){

    const weatherData = ref({})
    const loading = ref(false)
    const error = ref('')

   const getWeather = async ({city,country})=>{
        //Importar el api key del api usando variables de entorno (buenas practicas)
        const key = import.meta.env.VITE_API_KEY

        loading.value = true
        weatherData.value = {}
        error.value = ''
        //obtener latitud y longitud
        try {

            //end point GeocodingApi
            const url =`http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${key}`

            const {data} = await axios(url)
            const {lat, lon} = data[0]
            
            //obtener clima
            const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
            const {data:weather} = await axios(urlWeather)
            weatherData.value = weather
            
        } catch {
            error.value = 'Not found'
        }finally{
            loading.value = false
        }

   } 

   const showWeather = computed(()=>{
        return Object.values(weatherData.value).length > 0
   })

   const formatTemp = (temp) => parseInt(temp - 273.15)

    return{
        getWeather,
        weatherData,
        showWeather,
        formatTemp,
        loading,
        error
    }
}