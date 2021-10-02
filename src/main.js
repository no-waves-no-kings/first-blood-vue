import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import request from './utils/http';
import store from '@/store';
import api from '@/api';

const app = createApp(App);
app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.use(ElementPlus, { size: 'small' });
app.use(router);
app.use(store);
app.mount('#app');
