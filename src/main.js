import { createApp } from "vue";
import './scss/main.scss'
import '../public/css/app.css'
import App from "./App.vue";
import router from "./router";
import Store from "./store";
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/tailwind-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import  createComponents from './components';
import '../registerModulesRoutes';
import '/node_modules/primeflex/primeflex.css'



const app = createApp(App);
createComponents(app);
app.use(router).use(Store).use(PrimeVue).mount("#app");
