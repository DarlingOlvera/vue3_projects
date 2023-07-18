<script setup>
 import LinkComponent from '../components/LinkComponent.vue'
 import {FormKit} from '@formkit/vue'
import api from '../api/axios'
import {useRouter} from 'vue-router'

 const router = useRouter()

 const handleSubmit = (data) => {
    data.estado = 1
    api.post('clientes',data).then(resp =>{
        console.log(resp);
        router.push({name:'home'})
    }).catch(err => console.log(err))
 }


</script>
 
<template>
    <div>
        <link-component to="home">Volver</link-component>
        <h1 class=" text-4xl">Agregar Nuevo Cliente</h1>
    </div>
    <div class="mx-auto mt-10">
        <div class="mx-auto w-1/3">
            <FormKit 
            type="form" 
            submit-label="Agregar cliente"
            incomplete-message="NO se pudo enviar, revise todos los campos"
            @submit="handleSubmit"
            >
                <FormKit 
                    type="text"
                    label="Nombre"
                    name="nombre"
                    placeholder="Nombre del cliente"
                    validation="required"
                    :validation-messages="{required: 'El Nombre del cliente es obligatorio'}"
                    />
                <FormKit 
                    type="text"
                    label="Apellido"
                    name="apellido"
                    placeholder="Apellido del cliente"
                    validation="required"
                    :validation-messages="{required: 'El Apellido del cliente es obligatorio'}"
                    />
                <FormKit 
                    type="text"
                    label="Email"
                    name="email"
                    placeholder="Email del cliente"
                    validation="required|email"
                    :validation-messages="{required: 'El Apellido del cliente es obligatorio', email:'Coloca un email válido'}"
                    />
                <FormKit 
                    type="text"
                    label="Teléfono"
                    name="telefono"
                    placeholder="Teléfono: XXX-XXX-XXXX"
                    validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                    :validation-messages="{matches: 'El formato no es válido'}"
                    />
                <FormKit 
                    type="text"
                    label="Empresa"
                    name="empresa"
                    placeholder="Empresa del cliente"
                    />
                <FormKit 
                    type="text"
                    label="Puesto"
                    name="puesto"
                    placeholder="Puesto del cliente"
                    />
            </FormKit>
        </div>
    </div>
</template>
 
<style>
.formkit-wrapper{
    width:100%;
}
 .formkit-input{
    font-family: 'Special Elite' !important;
    background-color: white;
 }
 .formkit-label{
    font-family: 'Special Elite';
    font-size: 16px;
    font-weight: 400;
 }
 .formkit-message{
    font-family: 'Special Elite';
    font-size: 14px;
 }
</style>