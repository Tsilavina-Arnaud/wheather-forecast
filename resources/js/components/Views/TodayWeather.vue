<template>
    <div class="sm:flex items-center justify-between gap-8">
        <div data-aos="flip-left" class="bg-gray-50 py-5 px-8 rounded-2xl basis-1/2 gap-6">
            <IconImage :icon="icon" />
            <el-text type="info" class="mt-1">{{ text }}</el-text>
            <p class="mt-1 text-sm">
                <span class="text-gray-700">Humidity: </span
                ><span class="text-xl font-bold"
                    >{{ currentWeatherStore.current.humidity }} %</span
                >
            </p>
            <p class="text-sm">
                <span class="text-gray-700">Heat index: </span
                ><span class="text-xl font-bold"
                    >{{ currentWeatherStore.current.feelslike_c }} °C</span
                >
            </p>
        </div>
        <div data-aos="flip-right" class="bg-gray-50 py-5 px-8 rounded-2xl basis-1/2 gap-6 relative mt-10 sm:mt-0">
            <div class="flex items-center">
                <div class="mr-2">
                    <i class="bi bi-wind text-4xl"></i>
                </div>
                <div>
                    <p class="text-gray-700 text-sm">
                        Wind degree:
                        <span class="font-bold text-xl"
                            >{{
                                currentWeatherStore.current.wind_degree
                            }}
                            °</span
                        >
                    </p>
                    <p class="text-gray-700 text-sm">
                        wind direction:
                        <span class="font-bold text-xl">{{
                            currentWeatherStore.current.wind_dir
                        }}</span>
                    </p>
                </div>
            </div>
            <p class="mt-3 text-sm">
                <span class="text-gray-700">Pressure: </span
                ><span class="text-xl font-bold"
                    >{{ currentWeatherStore.current.pressure_in }} inches</span
                >
            </p>
            <p class="text-sm">
                <span class="text-gray-700">Cloud: </span
                ><span class="text-xl font-bold">{{
                    currentWeatherStore.current.cloud
                }}</span>
            </p>
            <p class="text-sm">
                <span class="text-gray-700">Precipitation: </span
                ><span class="text-xl font-bold"
                    >{{ currentWeatherStore.current.precip_in }} inch</span
                >
            </p>
        </div>
    </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import IconImage from "@/components/elements/iconImage.vue";
import { useCurrentWeatherStore } from "@/stores/currentWeather";
const currentWeatherStore = useCurrentWeatherStore();
const icon = ref("");
const text = ref("");

watchEffect(async () => {
    if (currentWeatherStore.current) {
        icon.value = currentWeatherStore.current.condition.icon;
        text.value = currentWeatherStore.current.condition.text;
    }
});
</script>
<style scoped></style>
