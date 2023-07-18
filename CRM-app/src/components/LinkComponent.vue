<script setup>
 import {RouterLink} from 'vue-router'

 const props = defineProps({
    to:{
        type: String
    }
 })
</script>
<template>
  <div class="text-red-500 mb-2 uppercase text-md font-semibold">
        <RouterLink :to="{name: to}">
            <slot></slot>
        </RouterLink>
    </div>
</template>