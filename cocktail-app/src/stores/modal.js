import { defineStore } from 'pinia'
import {ref,computed}from 'vue'
import {useFavoritoStore} from './favoritos'
import {useBebidasStore} from './bebidas'
 
export const useModalStore = defineStore('modalStore', () => {
    
    const favoritoStore = useFavoritoStore()
    const bebidas = useBebidasStore()
    const modal = ref(false)
 
 
    //Actions (functions)
    function handleClickModal(){
        modal.value = !modal.value
    }
    
    return {
        handleClickModal,
        modal,
    }
})