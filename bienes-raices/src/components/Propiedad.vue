<script setup>


 const props = defineProps({
    propiedad:{
        type:Object,
        required:true
    },
    price:{
        type:Function
    }
 })

</script>
 
<template>
 <v-col
    cols="12"
    md="4"
    lg="4"
 >
    <v-card>
        <v-img :src="propiedad.imagen" height="250" cover />

        <v-card-title>{{ propiedad.titulo }}</v-card-title>

        <v-card-text class="text-truncate">{{ propiedad.descripcion }}</v-card-text>
        <v-card-text class="text-h6 font-weight-bold"> Precio: {{ price(propiedad.precio) }}</v-card-text>

        <template v-slot:actions>
            <v-btn
                block
                color="amber-accent-3"
                variant="flat"
                class="font-weight-bold text-white"
                :to="{name:'propiedad', params:{id:propiedad.id}}"
            >Ver información</v-btn>
        </template>
    </v-card>
 </v-col>
</template>
 