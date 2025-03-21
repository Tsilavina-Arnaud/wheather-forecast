import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const useCurrentWeatherStore = defineStore("currentWeather", () => {
    const location = ref("");
    const current = ref("");
    const icon = ref("");
    const defaultCity = ref(import.meta.env.VITE_DEFAULT_WEATHER_CITY);
    const appID = import.meta.env.VITE_WEATHER_API;
    const errorMessage = ref("");

    async function search(q) {
        try {
            const response = await fetch(
                `http://api.weatherapi.com/v1/current.json?key=${appID}&q=${q}`
            );

            const data = await response.json();
            if (data.error) {
                errorMessage.value = data.error.message;
            } else {
                location.value = data.location;
                current.value = data.current;
                icon.value = data.current.condition.icon;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getWeather(lat, lon) {
        try {
            const response = await fetch(
                `http://api.weatherapi.com/v1/current.json?key=${appID}&q=${lat},${lon}`
            );

            const data = await response.json();
            location.value = data.location;
            current.value = data.current;
            icon.value = data.current.condition.icon;

            localStorage.setItem('temp_c', current.value.temp_c)
        } catch (error) {
            console.log(error);
        }
    }

    async function getDefaultWeather(city) {
        let response = "";
        if (city) {
            try {
                response = await fetch(
                    `http://api.weatherapi.com/v1/current.json?key=${appID}&q=${city}`
                );
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                response = await fetch(
                    `http://api.weatherapi.com/v1/current.json?key=${appID}&q=${defaultCity.value}`
                );
            } catch (error) {
                console.log(error);
            }
        }
        const data = await response.json();
        location.value = data.location;
        current.value = data.current;
        icon.value = data.current.condition.icon;

        localStorage.setItem('temp_c', current.value.temp_c)
    }

    return {
        getWeather,
        getDefaultWeather,
        location,
        current,
        icon,
        search,
        errorMessage,
    };
});
