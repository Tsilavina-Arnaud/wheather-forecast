import { defineStore } from "pinia";
import { useCurrentPositionStore } from "./currentPosition";
import { useCurrentWeatherStore } from "./currentWeather";
import { ref, watchEffect } from "vue";

export const useForecastStore = defineStore("forecast", () => {
    const apiKey = import.meta.env.VITE_WEATHER_API;
    const city = ref(import.meta.env.VITE_DEFAULT_WEATHER_CITY);
    const currentPositionStore = useCurrentPositionStore();
    const currentWeatherStore = useCurrentWeatherStore();
    const forecastData = ref("");
    const weekForecastData = ref('');

    /**
     * Get the weather forecast
     */
    function getWeatherForecast() {
        watchEffect(async () => {
            if (
                currentPositionStore.allowGeolocation &&
                currentWeatherStore.location
            ) {
                city.value = currentWeatherStore.location.name
                try {
                    const response = await fetch(
                        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city.value}&days=1&aqi=no&alerts=no`
                    );
                    const jsonResponse = await response.json();
                    forecastData.value = jsonResponse.forecast                                        
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }

    /**
     * Get the default wheather forecast if location is not allowed
     */
    async function getDefaultWeatherForecast()
    {
        try {
            const response = await fetch(
                `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city.value}&days=1&aqi=no&alerts=no`
            );
            const jsonResponse = await response.json();
            forecastData.value = jsonResponse.forecast;            
        } catch (error) {
            console.error(error);
        }
    }

    function getWeekWeatherForecast()
    {
        watchEffect(async () => {
            if (
                currentPositionStore.allowGeolocation &&
                currentWeatherStore.location
            ) {
                city.value = currentWeatherStore.location.name
                try {
                    
                    const response = await fetch(
                        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city.value}&days=3&aqi=no&alerts=no`
                    );
                    const jsonResponse = await response.json();                 
                    weekForecastData.value = jsonResponse.forecast.forecastday                                             
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }

    async function getDefaultWeekWeatherForecast()
    {
        try {
                    
            const response = await fetch(
                `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city.value}&days=3&aqi=no&alerts=no`
            );
            const jsonResponse = await response.json();                 
            weekForecastData.value = jsonResponse.forecast.forecastday                                                   
        } catch (error) {
            console.error(error);
        }
    }

    return {
        getWeatherForecast,
        forecastData,
        weekForecastData,
        getDefaultWeatherForecast,
        getWeekWeatherForecast,
        getDefaultWeekWeatherForecast
    };
});
