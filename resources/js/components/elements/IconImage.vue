<template>
    <div>
        <img :src="src" alt="" />
    </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
const props = defineProps({
    icon: {
        type: String,
        required: true
    }
});
const src = ref('')
watchEffect(async () => {
    if(props.icon){
        src.value = "http:" + props.icon
    }
})


</script>
<style></style>
