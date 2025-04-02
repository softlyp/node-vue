import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axiosPlugin from "./plugins/axios";
import axios from 'axios'
import router from './router'
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(axiosPlugin, axios);
app.use(router);
app.use(createPinia());
app.mount("#app");
