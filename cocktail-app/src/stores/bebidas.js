import { defineStore } from 'pinia'
import {ref,onMounted,reactive,computed}from 'vue'
import ApiService from '../services/ApiService'
import {useModalStore} from '../stores/modal'
import { useFavoritoStore } from './favoritos'
export const useBebidasStore = defineStore('bebidas', () => {
    
    const modalStore = useModalStore()
    const favoritoStore = useFavoritoStore()

    //state
    const categorias = ref([])
    const busqueda = reactive({
        nombre:'',
        categoria:''
    })

    const recetas = ref([])
    

    const receta = ref({})

    onMounted(async() => {
        const {data : {drinks}} = await ApiService.obtenerCategorias()

        categorias.value = drinks
    })
 
    //Getters (computed)
    const noRecetas = computed(() => recetas.value.length === 0)
    //Actions (functions)
    async function obtenerRecetas(){
       const {data} = await ApiService.buscarRecetas(busqueda)
       recetas.value = data.drinks
    }

    async function seleccionarBebida(id){

        const {data:{drinks}} = await ApiService.recetaCompleta(id)
        receta.value = {...drinks[0], favorite:false}

        favoritoStore.favoritos.forEach(item =>{
            if(receta.value.idDrink === item.idDrink){
                receta.value.favorite = true
            }
        })
        console.log(receta.value.favorite);
        

        modalStore.handleClickModal()

    }
 
    return {
        categorias,
        busqueda,
        obtenerRecetas,
        recetas,
        seleccionarBebida,
        receta,
        noRecetas
    }
})