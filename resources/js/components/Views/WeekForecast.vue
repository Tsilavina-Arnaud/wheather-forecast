<template>
    <div class="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 my-6">
        <div
            v-for="(wheatherInfos, index) in data"
            :key="index"
            class="col-span-1 hover:scale-105 duration-300 ease-in-out"
        >
            <div
                class="bg-white hover:border-yellowBold border-2 border-smallOrange rounded-2xl p-4"
            >
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-semibold text-lg">
                            {{ moment(wheatherInfos.date).format("dddd") }}
                        </p>
                        <p class="text-sm text-gray-500">
                            {{ wheatherInfos.day.condition.text }}
                        </p>
                    </div>
                    <IconImage :icon="wheatherInfos.day.condition.icon" />
                </div>
                <div class="mt-3">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-gray-800">
                                <i
                                    class="bi bi-wind text-yellowBold font-bold"
                                ></i
                                ><span class="ml-2 font-semibold">{{
                                    wheatherInfos.day.maxwind_kph
                                }}</span>
                                km/h
                            </p>
                        </div>
                        <p class="text-2xl font-bold">
                            {{ wheatherInfos.day.avgtemp_c }} °
                        </p>
                    </div>
                </div>
                <p class="mt-3 text-gray-500">
                    <span class="">Chance of rain</span>:
                    <span class="text-xl"
                        >{{ wheatherInfos.day.daily_chance_of_rain }}%</span
                    >
                </p>
                <div class="flex justify-between items-center mt-4">
                    <el-popover
                        placement="top-start"
                        :width="100"
                        trigger="hover"
                        content="Sunrise"
                        effect="light"
                    >
                        <template #reference>
                            <i
                                class="bi bi-sunrise-fill text-yellowBold text-4xl cursor-pointer"
                            ></i>
                        </template>
                    </el-popover>
                    <p class="font-semibold">
                        {{ wheatherInfos.astro.sunrise }}
                    </p>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <el-popover
                        placement="bottom-start"
                        :width="100"
                        trigger="hover"
                        content="Sunset"
                        effect="light"
                    >
                        <template #reference>
                            <i
                                class="bi bi-sunset-fill text-orange-600 text-4xl cursor-pointer"
                            ></i>
                        </template>
                    </el-popover>
                    <p class="font-semibold">
                        {{ wheatherInfos.astro.sunset }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useForecastStore } from "@/stores/forecast";
import { ref, watchEffect } from "vue";
import { useCurrentPositionStore } from "@/stores/currentPosition";
import moment from "moment";
import IconImage from "@/components/elements/iconImage.vue";

const forecastStore = useForecastStore();
const currentPositionStore = useCurrentPositionStore();
const data = ref("");

watchEffect(() => {
    if (currentPositionStore.allowGeolocation) {
        forecastStore.getWeekWeatherForecast();

        if (forecastStore.weekForecastData) {
            data.value = forecastStore.weekForecastData;
        }
    } else {
        forecastStore.getDefaultWeekWeatherForecast();
        data.value = forecastStore.weekForecastData;
    }
});
</script>
<style scoped></style>
