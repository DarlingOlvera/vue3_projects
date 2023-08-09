<script setup>
 import {useForm, useField} from 'vee-validate'
 import {loginSchema as validationSchema} from '../validation/loginSchema'
 import {useAuthStore} from '../stores/auth'
 


 const {handleSubmit} = useForm({validationSchema})
 const authStore = useAuthStore()
 

 const email = useField('email')
 const password = useField('password')



 const onSubmit = handleSubmit((values) =>{
    authStore.login(values)
 })
</script>
 
<template>
    
    <v-card
    flat
    max-width="600"
    class="mx-auto"
    >
        <v-card-title class="text-h4 font-weight-bold" tag="h3">
            Iniciar sesión    
        </v-card-title>
        <v-card-subtitle class="text-h5">
            Inicia sesión con tu cuenta
        </v-card-subtitle>
        <v-alert
            v-if="authStore.hasError"
            type="error"
            :title="authStore.errorMsg"
            class="my-5"
        ></v-alert>
        <v-form 
        class="mt-10"
        >
            <v-text-field
            type="email"
            label="Email"
            variant="outlined"
            color="purple-darken-3"
            bg-color="purple-lighten-5"
            class="mb-3"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value">
            </v-text-field>
            <v-text-field
            label="Password"
            variant="outlined"
            color="purple-darken-3"
            class="mb-5"
            type="password"
            bg-color="purple-lighten-5"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value">
            </v-text-field>

            <v-btn
            block
            flat
            color="amber-accent-3"
            class="text-white"
            @click="onSubmit">
                Iniciar sesión
            </v-btn>
        </v-form>
 </v-card>
</template>
 
<style scoped>
 
</style>