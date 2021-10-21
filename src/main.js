import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import request from './utils/http';
import store from '@/store';
import api from '@/api';
import Storage from './utils/storage';

const app = createApp(App);
app.directive('has', {
  beforeMount: function (el, binding) {
    let item = Storage.getItem('actionList');
    let value = binding.value;
    let hasPermission = item.includes(value);
    if (!hasPermission) {
      el.style = 'display: none';
      setTimeout(() => {
        el.parentNode.removeChild(el);
      }, 0);
    }
  },
});
app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.use(ElementPlus, { size: 'small' });
app.use(router);
app.use(store);
app.mount('#app');
