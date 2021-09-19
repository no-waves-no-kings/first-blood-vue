import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import request from './utils/http';
import store from '@/store';

const app = createApp(App);
app.config.globalProperties.$request = request;
app.config.globalProperties.$store = store;
app.use(ElementPlus);
app.use(router);
app.mount('#app');
