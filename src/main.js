import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import i18n from "@/i18n/index.js";
import VOtpInput from "vue3-otp-input";
import VueApexCharts from "vue3-apexcharts";

// Add Style
import "@/assets/css/main.scss";

// Add Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

// Prime vue
import "primevue/resources/themes/lara-light-indigo/theme.css";

// Add BaseUrl
import axios from "axios";
axios.defaults.baseURL = "https://murouj.aait-sa.com/api/";
axios.defaults.headers.lang = localStorage.getItem("lang") || "ar";

// Add fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(far, fas, fab);

// Add Maps
import GoogleMap from 'vue-google-maps-ui';

createApp(App)
    .use(i18n)
    .use(PrimeVue)
    .use(store)
    .use(router)
    .use(ToastService)
    .use(VueApexCharts)
    .component("v-otp-input", VOtpInput)
    .component("font-awesome-icon", FontAwesomeIcon)
    .component('Googlemap', GoogleMap)
    .mount("#app");
