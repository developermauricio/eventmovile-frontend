/***  librerias externas  ***/
import Toaster from '@meforma/vue-toaster';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createApp } from 'vue';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueSweetalert2 from 'vue-sweetalert2';

import DropZone from 'dropzone-vue';
import 'dropzone-vue/dist/dropzone-vue.common.css';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
/* import VeeValidate, {Validator} from 'vee-validate';
import validatorEs from 'vee-validate/dist/locale/es'; */
/***  Importaciones de la aplicación  ***/
import App from './App.vue';
import router from './router';
import store from './store';
require('./plugins');



/*** config axiox ***/
/* const baseURL = process.env.VUE_APP_API_URL
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('_current_token')}`
axios.defaults.withCredentials = false 
.use(VueAxios, axios)*/

const app = createApp(App)
    .use(VueLoading, { color: '#ac58bc' })
    .use(VueSweetalert2)
    .use(Toaster)
    .use(store)
    .use(router)
    .use(Toast)
    .use(DropZone);

/*** config library dayjs ***/
dayjs.locale('es');
app.config.globalProperties.$dayjs = dayjs;

app.mount('#app');
