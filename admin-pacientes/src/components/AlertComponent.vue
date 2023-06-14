<script setup>
 
 const props = defineProps({
    alert:{
        type:Object,
        required:true
    }
 })
</script>
 
<template>
    <div
      class="text-white text-center p-3 uppercase font-bold mb-3 rounded-md"
      :class="alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'">
       {{ alert.message }}

    </div>
</template>
 
 
