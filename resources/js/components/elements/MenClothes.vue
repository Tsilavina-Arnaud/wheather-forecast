<template>
    <div>
        <div class="block text-center">
            <el-carousel height="450px">
                <el-carousel-item class="bg-gray-500" v-for="(item, index) in clothes" :key="index">
                    <img :src="item.image" alt="" class="w-full h-full">
                    <h2 class="font-semibold absolute bottom-0 mb-3 left-2">{{ item.name }}</h2>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import MenClothes from '../../bdd/mencClothes'

const temp_c = localStorage.getItem('temp_c');

const clothes = computed(() => {
    if (temp_c <= -5) {
        return MenClothes[0]
    }
    if (temp_c >= -5 && temp_c <= 0) {
        return MenClothes[1]
    }
    if (temp_c >= 0 && temp_c <= 10) {
        return MenClothes[2]
    }
    if (temp_c >= 10 && temp_c <= 15) {
        return MenClothes[3]
    }
    if (temp_c >= 15 && temp_c <= 20) {
        return MenClothes[4]
    }
    if (temp_c >= 20 && temp_c <= 25) {
        return MenClothes[5]
    }
    if (temp_c > 25) {
        return MenClothes[6]
    }
})


</script>
<style scoped>

</style>
