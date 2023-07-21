
<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {useModalStore} from '../stores/modal'
import { useBebidasStore } from '../stores/bebidas'
import { useFavoritoStore } from '../stores/favoritos'

const modalStore = useModalStore()
const bebidasStore = useBebidasStore()
const favoritoStore = useFavoritoStore()

const formatearIngredientes = () =>{
    const ingredientesDiv = document.createElement('DIV')

    for(let i = 1; i <= 15; i++){
      if(bebidasStore.receta[`strIngredient${i}`]){
        const ingrediente = bebidasStore.receta[`strIngredient${i}`]
        let cantidad = bebidasStore.receta[`strMeasure${i}`] 
        
        if(cantidad == null){
          cantidad = ' '
        }

        const ingredienteCantidad = document.createElement('P')
        ingredienteCantidad.classList.add('text-md','text-gray-500')
        ingredienteCantidad.textContent = `${ingrediente} - ${cantidad}`

        ingredientesDiv.appendChild(ingredienteCantidad)
      }
    }

    return ingredientesDiv
}

</script>

<template>
    <TransitionRoot as="template" :show="modalStore.modal" >
      <Dialog as="div" class="relative z-10" @close="modalStore.handleClickModal()">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                <div>
                  <div class="mt-3">
                    <DialogTitle as="h3" class="text-gray-900 text-4xl font-bold my-5 text-center">
                        {{ bebidasStore.receta.strDrink }}
                    </DialogTitle>
                    <img 
                    :src="bebidasStore.receta.strDrinkThumb" 
                    :alt="`${bebidasStore.receta.strDrink} image`"
                    >
                    <div class="mb-0 my-2 p-0 flex justify-end">
                      <button @click="favoritoStore.handleClickFavorito()">
                        <svg class="w-[40px] text-gray-300 hover:text-yellow-400" :class="bebidasStore.receta.favorite ? 'text-yellow-400' : 'text-gray-300'"  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path clip-rule="evenodd" fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"></path>
                        </svg>
                      </button>
                    </div>
                    <DialogTitle as="h3" class="text-gray-900 text-4xl font-bold mb-5">
                        Ingredients
                    </DialogTitle>
                    <div v-html="formatearIngredientes().outerHTML"></div>
                    <DialogTitle as="h3" class="text-gray-900 text-4xl font-bold my-5">
                        Preparation
                    </DialogTitle>
                    <p class="text-md text-gray-500">{{ bebidasStore.receta.strInstructions }}</p>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                    <button
                        type="button"
                        class="w-full rounded bg-gray-600 p-3 font-extrabold uppercase text-white shadow hover:bg-gray-500 transition-colors"
                        @click="modalStore.handleClickModal()">Close</button>
                </div> 
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>
<style scoped>
h3{
    font-family: 'Dancing Script';
}

</style>