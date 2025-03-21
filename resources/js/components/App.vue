<template>
    <div class="container sm:mx-auto px-4">
        <div class="md:flex justify-between items-center my-6">
            <div class="basis-3/5">
                <h1 class="text-xl font-semibold animate__animated animate__backInDown">Weather Forecast</h1>
                <el-text type="info">{{ now }}</el-text>
            </div>
            <div class="relative basis-2/5 mt-6 md:mt-0">
                <span class="absolute top-3 left-3"
                    ><i class="bi bi-search"></i
                ></span>
                <input
                    type="text"
                    placeholder="city, US zip, UK postcode, Canada postal code, ..."
                    v-model="search"
                    @keyup.enter="
                        searchData = search;
                        search = '';
                    "
                    class="py-3 w-1/2 focus:w-full duration-300 ease-in-out text-gray-700 px-3 pl-10 bg-gray-50 rounded-full focus:outline-none"
                />
            </div>
        </div>
        <div class="xl:flex items-start gap-8">
            <div class="basis-3/5">
                <div class="flex justify-between items-center"></div>
                <div v-if="errorMessage" class="mt-6">
                    <el-alert
                        :title="errorMessage"
                        type="error"
                        effect="dark"
                        show-icon
                    />
                </div>
                <CurrentWeather
                    :search="searchData"
                    @failed-geolocation="getDefaultWeatherForecast"
                />
                <h1 class="font-semibold text-xl text-gray-700">
                    Today's hightlight
                </h1>
                <div class="md:flex items-center gap-6">
                    <CardInfo data-aos="zoom-in" class="basis-1/2">
                        <template v-slot:title>
                            <h3 class="font-semibold">Sunrise & Sunset</h3>
                        </template>
                        <template #content>
                            <div class="flex justify-between items-center">
                                <div class="flex items-center">
                                    <img
                                        src="../../../public/images/sunrise.png"
                                        alt=""
                                        class="w-12 h-12"
                                    />
                                    <div
                                        v-for="(
                                            forecastDay, index
                                        ) in forecastStore.forecastData
                                            .forecastday"
                                        :key="index"
                                    >
                                        <p
                                            class="text-gray-700 font-semibold text-sm"
                                        >
                                            {{ forecastDay.astro.sunrise }}
                                        </p>
                                        <p class="text-xs">Sunrise</p>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <img
                                        src="../../../public/images/sunset.png"
                                        alt=""
                                        class="w-12 h-12"
                                    />
                                    <div
                                        v-for="(
                                            forecastDay, index
                                        ) in forecastStore.forecastData
                                            .forecastday"
                                        :key="index"
                                    >
                                        <p class="text-gray-700 font-semibold">
                                            {{ forecastDay.astro.sunset }}
                                        </p>
                                        <p class="text-xs">Sunset</p>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </CardInfo>
                    <CardInfo data-aos="zoom-in" class="basis-1/2">
                        <template v-slot:title>
                            <h3 class="font-semibold">Moonrise & Moonset</h3>
                        </template>
                        <template #content>
                            <div class="flex justify-between items-center">
                                <div class="flex items-center">
                                    <img
                                        src="../../../public/images/moonrise.png"
                                        alt=""
                                        class="w-12 h-12 rounded-full"
                                    />
                                    <div
                                        class="ml-2"
                                        v-for="(
                                            forecastDay, index
                                        ) in forecastStore.forecastData
                                            .forecastday"
                                        :key="index"
                                    >
                                        <p
                                            class="text-gray-700 font-semibold text-sm"
                                        >
                                            {{ forecastDay.astro.moonrise }}
                                        </p>
                                        <p class="text-xs">Moorise</p>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <img
                                        src="../../../public/images/moonset.png"
                                        alt=""
                                        class="w-20"
                                    />
                                    <div
                                        class=""
                                        v-for="(
                                            forecastDay, index
                                        ) in forecastStore.forecastData
                                            .forecastday"
                                        :key="index"
                                    >
                                        <p class="text-gray-700 font-semibold">
                                            {{ forecastDay.astro.moonset }}
                                        </p>
                                        <p class="text-xs">Moonset</p>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </CardInfo>
                </div>
                <div>
                    <h1 class="text-xl my-3 font-semibold text-gray-700">
                        Today's temperature
                    </h1>
                    <Line data-aos="fade-up" :options="chartOptions" :data="chartData" />
                </div>
            </div>
            <div class="basis-2/5">
                <el-calendar class="mt-6" v-model="date" />
                <suggestion-clothes data-aos="flip-left" />
            </div>
        </div>
    </div>
</template>

<script setup>
import moment from "moment";
import CurrentWeather from "./Views/CurrentWeather.vue";
import CardInfo from "./elements/CardInfo.vue";
import { computed, provide, reactive, ref, watchEffect } from "vue";
import { useForecastStore } from "@/stores/forecast";
import { Line } from "vue-chartjs";
import { useCurrentWeatherStore } from "@/stores/currentWeather";
import SuggestionClothes from "./Views/SuggestionClothes.vue";

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    elements,
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
);

ElLoading.service({
    lock: true,
    text: "Wait...",
    background: "black",
});

const date = ref(new Date());

const dataChart = reactive({
    data: [],
});

const labelChart = reactive({
    label: [],
});

const chartData = computed(() => ({
    labels: labelChart.label,
    datasets: [
        {
            label: "Temperature",
            data: dataChart.data,
            fill: false,
            borderColor: "pink",
            backgroundColor: "#FAF7E8",
            tension: 0.4,
        },
    ],
}));

const chartOptions = {
    responsive: true,
    x: {
        grid: {
            display: false,
        },
    },
    layout: {
        padding: 0,
    },
    elements: {
        rectangle: {
            borderWidth: 0,
        },
    },
};

const forecastStore = useForecastStore();
forecastStore.getWeatherForecast();

const currentWheatherStore = useCurrentWeatherStore();
const errorMessage = ref("");

watchEffect(() => {
    if (forecastStore.forecastData) {
        const forecasthour = forecastStore.forecastData.forecastday[0].hour;

        labelChart.label = [];
        dataChart.data = [];

        forecasthour.forEach((forecastData) => {
            labelChart.label.push(moment(forecastData.time).format("HH:mm"));
            dataChart.data.push(forecastData.temp_c);
        });
    }

    if (currentWheatherStore.errorMessage) {
        errorMessage.value = currentWheatherStore.errorMessage;
        setInterval(() => {
            errorMessage.value = "";
        }, 5000);
    }
});

const now = moment().format("dddd DD, MMMM YYYY");
const search = ref("");
const searchData = ref("");

function getDefaultWeatherForecast() {
    forecastStore.getDefaultWeatherForecast();
}
</script>

<style scoped></style>
