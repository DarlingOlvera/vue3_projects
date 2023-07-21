import { defineStore } from 'pinia'
import {ref}from 'vue'
 
export const useNotificacionStore = defineStore('notificacion', () => {
 
    //state
    const show = ref(false)
    const text = ref('')
    const error = ref(false)
 
    //Getters (computed)
 
    //Actions (functions)
    function reset(){
        show.value = false
        text.value = ''
        error.value = ''
    }
 
    return {
        show, text,error,
        reset
    }
})