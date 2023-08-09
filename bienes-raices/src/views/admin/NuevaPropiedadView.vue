<script setup>
 import {useForm, useField} from 'vee-validate' 
 import {collection,addDoc} from 'firebase/firestore'
 import {useFirestore} from 'vuefire'
 import {useRouter} from 'vue-router'
 import {validationSchema, imageSchema} from '@/validation/propiedadSchema'
 import useImage from '@/composables/useImage'
 import useMap from '@/composables/useMap'
 import "leaflet/dist/leaflet.css";
 import { LMap, LTileLayer,LMarker } from "@vue-leaflet/vue-leaflet";

 const item = [1,2,3,4,5]
 const {uploadImage,image,url} = useImage()
 const db = useFirestore()
 const router = useRouter()
 const {zoom,center,pin} = useMap()

 

 const {handleSubmit} = useForm({
    validationSchema: {
        //useForm solo acepta un validationSchema, de esta forma se unen
        //los dos validation schemas que se necesitan 
        ...validationSchema,
        ...imageSchema
    }
 })
 
 //el v-model sería titulo.value.value, titulo porque es el nombre del campo y titene
 //doble value porque uno de ellos es el metodo value que tiene useField
 const titulo = useField('titulo')
 const imagen = useField('imagen')
 const precio = useField('precio')
 const habitaciones = useField('habitaciones')
 const wc = useField('wc')
 const estacionamiento = useField('estacionamiento')
 const descripcion = useField('descripcion')
 const alberca = useField('alberca',null,{
    initialValue:false
 })

 const onSubmit = handleSubmit(async(values)=>{

    //extrae la imagen del objeto y conserva lo demás
    const {imagen,...propiedad} = values

    const docRef = await addDoc(collection(db, "propiedades"),{
        ...propiedad,
        imagen: url.value,
        ubicación: center.value
    });

    if(docRef.id){
        router.push({name:'admin-propiedades'})
    }
 })
</script>
 
<template>
 <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold text-center" tag="h3">
        Nueva propiedad   
    </v-card-title>
    <v-card-subtitle class="text-h5 py-2 text-center">
        Crea una nueva propiedad llenando el siguiente formulario
    </v-card-subtitle>
    <v-form class="mt-10">
        <v-text-field
            class="mb-2"
            label="Título Propiedad"
            variant="outlined"
            color="purple-darken-3"
            v-model="titulo.value.value"
            :error-messages="titulo.errorMessage.value"
        />
        <v-file-input
            class="mb-2"
            label="Imagen Propiedad"
            color="purple-darken-3"
            variant="outlined"
            accept="image/jpeg"
            prepend-icon=""
            append-inner-icon="mdi-camera"
            @change="uploadImage"
            v-model="imagen.value.value"
            :error-messages="imagen.errorMessage.value"
        />
        <div v-if="image" class="my-5">
            <p class="font-weight-bold">Imagen propiedad:</p>
            <img :src="image" class="w-50">
        </div>
        <v-text-field
            class="mb-2"
            label="Precio Propiedad"
            variant="outlined"
            color="purple-darken-3"
            v-model="precio.value.value"
            :error-messages="precio.errorMessage.value"
        />
        <v-row class="mb-2 mt-0">
            <v-col cols="12" sm="12" md="4" class="my-0 py-0">
                <v-select
                    label="Habitaciones"
                    class="mb-2"
                    :items="item"
                    color="purple-darken-3"
                    variant="outlined"
                    v-model="habitaciones.value.value"
                    :error-messages="habitaciones.errorMessage.value"/>
            </v-col>
            <v-col cols="12" sm="12" md="4" class="my-0 py-0">
                <v-select
                    label="WC"
                    class="mb-2"
                    :items="item"
                    color="purple-darken-3"
                    variant="outlined"
                    v-model="wc.value.value"
                    :error-messages="wc.errorMessage.value"/>
            </v-col>
            <v-col cols="12" sm="12" md="4" class="my-0 py-0">
                <v-select
                    label="Lugares estacionamiento"
                    class="mb-2"
                    :items="item"
                    color="purple-darken-3"
                    variant="outlined"
                    v-model="estacionamiento.value.value"
                    :error-messages="estacionamiento.errorMessage.value"/>
            </v-col>
        </v-row>
        <v-textarea
            label="Descripción"
            variant="outlined"
            color="purple-darken-3"
            rows="3"
            no-resize
            v-model="descripcion.value.value"
            :error-messages="descripcion.errorMessage.value"/>
        <v-checkbox
            color="purple-darken-3"
            label="Alberca"
            v-model="alberca.value.value"
            :error-messages="alberca.errorMessage.value"/>

        <h2 class="font-weight-bold my-4">Ubicación</h2>
        <div style="height:600px;" class="mb-8">
            <LMap 
            ref="map" 
            v-model:zoom="zoom" 
            :center="center" 
            :use-global-leaflet="false">
            <LMarker
                :lat-lng="center"
                draggable
                @moveend="pin"/>
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                
            ></LTileLayer>
            </LMap>
        </div>

        <v-btn
            color="amber-accent-3"
            type="submit"
            block
            flat
            class="text-white text-uppercase font-weight-bold"
            @click="onSubmit"
            
            >Agregar propiedad</v-btn>
         
    </v-form>
 </v-card>
</template>
 