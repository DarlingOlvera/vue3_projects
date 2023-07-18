<script setup>
 import LinkComponent from '../components/LinkComponent.vue';
 import api from '../api/axios'
 import {RouterLink} from 'vue-router'
 import {onMounted,ref,computed} from 'vue'

 const clientes = ref([])

 onMounted(() => {
    api.get('clientes').then(resp =>{
        //console.log(resp.data);
        clientes.value = resp.data
    }).catch(err => console.log('Ocurrio un error: ',err))
 })

 const existenClientes = computed(()=>{
    return clientes.value.length > 0 
 })

 const actualizarEstado = (data) =>{

     if (data.estado == 0){
        data.estado = 1
     }else if(data.estado == 1){
        data.estado = 0
     }
    api.patch(`clientes/${data.id}`,{estado:data.estado} ).then(resp =>{
        const i = clientes.value.findIndex(el => el.id == data.id)
        clientes.value[i].estado = data.estado
        
    }).catch(err =>{
        console.log('ocurrio un error', err);
    })

}

const eliminarCliente = (id) =>{
    api.delete(`clientes/${id}`).then(resp =>{
        clientes.value = clientes.value.filter(el => el.id !== id)
    }).catch(err =>{
        console.log('ocurrio un error', err);
    })
}
</script>
 
<template>
    <div>
        <link-component to="add-client">Agregar cliente</link-component>
        <h1 class=" text-4xl">Listado de clientes</h1>

        <div v-if="existenClientes" class="flow-root mx-auto  mt-10 p-5">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Nombre</th>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Empresa</th>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Estado</th>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Acciones</th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="cliente in clientes" :key="cliente.id">
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                    <p class="font-medium text-gray-900">{{ cliente.apellido }} {{ cliente.nombre }}</p>
                                    <p class="text-gray-500">{{ cliente.email }}</p>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <p class="text-gray-900 font-bold">{{ cliente.empresa }}</p>
                                    <p class="text-gray-600">{{ cliente.puesto }}</p>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm">
                                    <button 
                                        class="inline-flex rounded-full text-xs font-semibold leading-5 px-4 pt-[2px]"
                                        :class="cliente.estado == 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                                        @click="actualizarEstado({id:cliente.id, estado:cliente.estado})">
                                        {{ cliente.estado == 1 ? 'Activo' : 'Inactivo' }}
                                    </button>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                                    <div class="flex justify-start">

                                        <router-link :to="{name:'edit-client', params:{id: cliente.id}}">
                                            <svg fill="none" class="text-blue-500 w-[24px] h-[24px]" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                            </svg>
                                        </router-link>
                                        <button @click="eliminarCliente(cliente.id)">
                                            <svg fill="none" stroke="currentColor" class="text-red-500 w-[24px] h-[24px] ml-2" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"></path>
                                            </svg>
                                        </button>
                                        
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <p v-else class="text-center mt-10 text-gray-500">No hay clientes para mostrar</p>
    </div>
</template>
 
<style scoped>
 
</style>