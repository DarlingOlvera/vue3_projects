<script setup>
import usePropiedades from '../composables/usePropiedades'
import Propiedad from '../components/Propiedad.vue'
import {precioPropiedad} from '../helpers'

const {alberca,propiedadesFiltradas} = usePropiedades()
</script>

<template>
    <h1 class="text-center text-h4">Nuestras propiedades</h1>
    <v-card flat class="py-10">
      <v-card-title class="text-h5">
        Búsqueda
        <v-checkbox
        label="Con alberca"
        color="purple-darken-3"
        v-model="alberca"
        />
      </v-card-title>
      <v-row>
        <Propiedad
          v-for="propiedad in propiedadesFiltradas"
          :key="propiedad.id"
          :propiedad="propiedad"
          :price="precioPropiedad"
        />
      </v-row>
    </v-card>
</template>
