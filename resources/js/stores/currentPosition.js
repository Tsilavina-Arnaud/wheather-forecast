import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentPositionStore = defineStore('currentPosition',() => {
    
    const lat = ref('')
    const lon = ref('')
    const allowGeolocation = ref(true)

    function setCurrentPosition (coords)
    {
        lat.value = coords.latitude
        lon.value = coords.longitude
    }

    function denie()
    {
        allowGeolocation.value = false
    }

    return {
        lat, lon, setCurrentPosition, allowGeolocation, denie
    }
})