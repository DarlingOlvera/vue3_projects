<script setup>
 import usePropiedades from '@/composables/usePropiedades';
 import { precioPropiedad } from '../../helpers';
 const {propiedadesCollection,deleteItem} = usePropiedades()
</script>
 
<template>
 <h2 class="text-center text-h3 my-5 font-weight-bold">Admin panel</h2>

 <v-btn
 color="blue"
 class="ml-3"
 flat
 :to="{name:'nueva-propiedad'}">Nueva propiedad</v-btn>

 <v-card class="mx-auto mt-5" flat>
    <v-list>
        <v-list-item
            v-for="propiedad in propiedadesCollection"
            :key="propiedad.id"
        >

            <template v-slot:prepend>
                <v-list-item-media :start="true">
                    <img :src="propiedad.imagen" width="200">
                </v-list-item-media>
            </template>

            <template v-slot:append>
                <v-btn color="info" flat class="mr-2" :to="{name:'editar-propiedad', params:{id:propiedad.id}}">Editar</v-btn>
                <v-btn color="red-darken-4" flat @click="deleteItem(propiedad.id,propiedad.imagen)">Eliminar</v-btn>
            </template>
            <v-list-item-title>
                {{ propiedad.titulo }}
            </v-list-item-title>
            <v-list-item-subtitle>
                {{ precioPropiedad(propiedad.precio) }}
            </v-list-item-subtitle>
        </v-list-item>
    </v-list>
 </v-card>
</template>
 
