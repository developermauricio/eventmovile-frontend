/***  librerias externas  ***/
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

/***  Importaciones de la aplicación  ***/
import App from './App.vue'
import router from './router'
import store from './store'
require('./plugins')
import { createApp } from 'vue'


/*** config axiox ***/
/* const baseURL = process.env.VUE_APP_API_URL
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('_current_token')}`
axios.defaults.withCredentials = false 
.use(VueAxios, axios)*/

const app = createApp(App)
    .use(VueLoading, { color: '#ac58bc' })
    .use(store)
    .use(router);

/*** config library dayjs ***/
dayjs.locale('es');
app.config.globalProperties.$dayjs = dayjs

app.mount('#app');
