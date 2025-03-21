import "./bootstrap";
import "bootstrap-icons/font/bootstrap-icons.min.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import Vue3Toastify from 'vue3-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css'
import 'animate.css'

import { createApp } from "vue";

import { createPinia } from "pinia";
import App from "./components/App.vue";

const pinia = createPinia();
const app = createApp(App);


app.use(pinia)
app.use(ElementPlus)
app.use(AOS.init())
app.use(Vue3Toastify, {
    autoClose: 2000,
    style: {
        opacity: '1',
        userSelect: 'initial'
    }
})
app.mount("#app");
