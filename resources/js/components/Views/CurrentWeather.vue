<template>
    <div>
        <div class="mt-6">
            <el-button type="primary" @click="refresh">Refresh</el-button>
        </div>
        <div class="w-full my-8 rounded-3xl p-8 bg-smallPink">
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-gray-500 font-semibold">
                        <i class="bi bi-geo-alt text-gray-800 mr-2"></i
                        >{{ currentWeatherStore.location.region }}
                    </p>
                    <p class="mt-3">
                        <span class="font-bold text-yellowBold uppercase">{{
                            currentWeatherStore.location.country
                        }}</span>
                    </p>
                    <p class="text-6xl mt-8">
                        {{ currentWeatherStore.current.temp_c }}°
                    </p>
                </div>
                <icon-image :icon="icon" />
            </div>
        </div>
        <div class="my-8">
            <el-tabs v-model="activeTab">
                <el-tab-pane label="Today" name="first">
                    <TodayWeather />
                </el-tab-pane>
                <el-tab-pane label="3 Days" name="seconde">
                    <week-forecast />
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog v-model="confirm" title="Geolocation" width="500">
            <span>Do you want store your favorite city?</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="confirm = false">Cancel</el-button>
                    <el-button
                        type="primary"
                        @click="(confirm = false), (storeCity = true)"
                    >
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { useCurrentPositionStore } from "@/stores/currentPosition";
import { useCurrentWeatherStore } from "@/stores/currentWeather";
import IconImage from "@/components/elements/iconImage.vue";
import TodayWeather from "@/components/Views/TodayWeather.vue";
import { onBeforeMount, ref, watch, watchEffect } from "vue";
import WeekForecast from "./WeekForecast.vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps(["search"]);

const currentPositionStore = useCurrentPositionStore();
const currentWeatherStore = useCurrentWeatherStore();
const icon = ref("");
const currentWeather = ref("");
const emits = defineEmits(["failedGeolocation"]);
const activeTab = ref("first");
const allowGeolocation = ref(false);
const city = ref("");
const isLoaded = ref(false);

const confirm = ref(false);
const storeCity = ref(false);

onBeforeMount(() => {
    checkPosition();
});

const checkPosition = () => {
    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            successGeolocation,
            failedGeolocation
        );
    }
};

function successGeolocation(position) {
    currentPositionStore.setCurrentPosition(position.coords);
    currentWeatherStore.getWeather(
        currentPositionStore.lat,
        currentPositionStore.lon
    );

    allowGeolocation.value = true;
}

function failedGeolocation(err) {
    currentPositionStore.denie();

    axios.get("/user/city").then((response) => {
        const favoriteCity = response.data.data["favorite_city"];
        if (favoriteCity) {
            currentWeatherStore.getDefaultWeather(favoriteCity);
        } else {
            currentWeatherStore.getDefaultWeather("");
        }
    });

    console.error(err.message);
    emits("failedGeolocation");
}

function refresh() {
    if (currentPositionStore.allowGeolocation) {
        currentWeatherStore.getWeather(
            currentPositionStore.lat,
            currentPositionStore.lon
        );
    } else {
        currentWeatherStore.getDefaultWeather();
    }
}

watchEffect(() => {
    if (
        currentWeatherStore.icon &&
        currentWeatherStore.current &&
        currentWeatherStore.location
    ) {
        isLoaded.value = true;
        icon.value = currentWeatherStore.icon;
        currentWeather.value = currentWeatherStore.current;
        city.value = currentWeatherStore.location.name;
    }

    if (props.search) {
        currentWeatherStore.search(props.search);
    }
});

watch(
    [allowGeolocation, storeCity, isLoaded],
    ([newAllowGeolocation, newStoreCity, newIsLoaded]) => {
        if (newAllowGeolocation) {
            confirm.value = true;
        }

        if (newStoreCity) {
            axios
                .post("/user/favorite_city", {
                    city: city.value,
                })
                .then((response) => {
                    toast.success(response.data.success, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                });
            confirm.value = false;
        }

        if (newIsLoaded == false) {
            loading
        } else {
            loading.close()
        }
    }
);

const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
});
</script>
<style scoped></style>
