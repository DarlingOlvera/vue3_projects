import { defineStore } from 'pinia'
import {ref, watch, onMounted,computed}from 'vue'
import {useBebidasStore} from './bebidas'
import {useModalStore} from './modal'
import {useRoute} from 'vue-router'
import {useNotificacionStore} from './notificaciones'
 
export const useFavoritoStore = defineStore('favorito', () => {
 
    const bebidas = useBebidasStore()
    const modal = useModalStore()
    const notificacion = useNotificacionStore()
    const favoritos = ref([])
    const route = useRoute()

    onMounted(() => {
      favoritos.value = JSON .parse(localStorage.getItem('favoritos')) ?? [] 
    })

    watch(favoritos, () =>{
        guardarLocalStorage()

    },{
        deep:true
    })
    
    const guardarLocalStorage = () =>{
       localStorage.setItem('favoritos', JSON.stringify(favoritos.value)) 
    }

    const existeFavorito = (id) =>{
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []
        return favoritosLocalStorage.some(el => el.idDrink === id)
    }

    const eliminarFavorito = () =>{
        bebidas.receta.favorite = false
        favoritos.value = favoritos.value.filter(el => el.idDrink !== bebidas.receta.idDrink)
        notificacion.show = true
        notificacion.text = 'Removed from favorites'

        setTimeout(() => {
            notificacion.reset()
        }, 3000);
    }

    const agregarFavorito = () =>{
        bebidas.receta.favorite = true
        favoritos.value.push(bebidas.receta)
        notificacion.show = true
        notificacion.text = 'Added to favorites'

        setTimeout(() => {
            notificacion.reset()
        }, 3000);
    }

    const handleClickFavorito = ()=>{
        if(existeFavorito(bebidas.receta.idDrink)){
            eliminarFavorito()
            if(route.name == 'favoritos'){
                modal.modal = false
            }
            
        }else{
            agregarFavorito()
        }
    }

    const noFavoritos = computed(() => favoritos.value.length === 0)
 
    return {
        handleClickFavorito,
        favoritos,
        existeFavorito,
        noFavoritos
    }
})