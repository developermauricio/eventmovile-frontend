import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./plugins/axios"

const app = createApp(App)
    .use(store)
    .use(router);

dayjs.locale('es');
app.config.globalProperties.$dayjs = dayjs

app.mount('#app');
