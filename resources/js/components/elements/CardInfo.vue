<template>
    <div class=" my-8 bg-gray-50 py-5 px-8 rounded-2xl">
        <header>
            <slot name="title"></slot>
        </header>
        <main class=" mt-2">
            <slot name="content"></slot>
        </main>
    </div>
</template>
<script setup>

</script>
<style scoped>
    
</style>