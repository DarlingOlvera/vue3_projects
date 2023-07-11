<template>
    <div class="alert">
        <slot></slot>
    </div>
</template>
 
<style scoped>
    .alert{
        padding: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 1.2rem;
        text-align: center;
        background-color: whitesmoke;
        border-left: .5rem solid #b91c1c;
        color:#b91c1c;
    }
</style>