<template>
    <div>
        <h1 class="text-xl font-semibold">Suggestion for clothing</h1>
        <el-tabs class="mt-3" v-model="activeTab">
            <el-tab-pane label="Man" name="first">
                <MenClothes />
            </el-tab-pane>
            <el-tab-pane label="Woman" name="second">
                <WomenClothes />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup>
import { ref } from "vue";
import MenClothes from "@/components/elements/MenClothes.vue";
import WomenClothes from "../elements/WomanClothes.vue";

const activeTab = ref("first");
</script>
<style scoped></style>
