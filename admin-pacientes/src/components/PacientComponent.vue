<script setup>
 
 const props = defineProps({
    pacient:{
        type:Object,
        required:true
    }
 })

 const emit = defineEmits(['update-pacient','delete-pacient'])

</script>
 
<template>
    <div class="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p class="font-bold mb-3 text-gray-700 uppercase">ID:
            <span class="font-normal normal-case">
                {{ pacient.id }}
            </span>
        </p>

        <p class="font-bold mb-3 text-gray-700 uppercase">Nombre:
            <span class="font-normal normal-case">
                {{ pacient.name }}
            </span>
        </p>

        <p class="font-bold mb-3 text-gray-700 uppercase">Propietario: 
            <span class="font-normal normal-case">
                {{ pacient.owner }}
            </span>
        </p>

        <p class="font-bold mb-3 text-gray-700 uppercase">Email: 
            <span class="font-normal normal-case">
                {{ pacient.ownerEmail }}
            </span>
        </p>

        <p class="font-bold mb-3 text-gray-700 uppercase">Fecha Alta:
            <span class="font-normal normal-case">
                {{ pacient.dischargeDate }}
            </span>
        </p>

        <p class="font-bold mb-3 text-gray-700 uppercase">Síntomas:
            <span class="font-normal normal-case">
                {{ pacient.sintoms }}
            </span>
        </p>

        <div class="grid md:grid-cols-2  gap-5 mt-10 ">
            <button 
                type="button"
                class="block w-full py-2 px-10 bg-yellow-400 hover:bg-yellow-500 text-white font-bold uppercase rounded-lg"
                @click="emit('update-pacient',pacient.id)"
            >Editar</button>

            <button 
                type="button"
                class="block w-full py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                @click="emit('delete-pacient',pacient.id)"
            >Eliminar</button>
        </div>
    </div>
</template>