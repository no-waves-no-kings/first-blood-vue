/**
 * axios请求封装
 */
import axios from 'axios';
import EnvConfig from '../config';
import ExceptionCode from '../exception/exception-code';
import { ElMessage } from 'element-plus';
import router from '../router';
import Storage from './storage';
// 初始化axios
const service = axios.create({
  baseURL: EnvConfig.baseApi,
  timeout: 8000,
});

// 拦截请求
service.interceptors.request.use(
  (req) => {
    // 给header添加token
    if (!req.headers.Authorization) {
      let userInfo = Storage.getItem('userInfo');
      if (userInfo) {
        req.headers.Authorization = 'Bearer ' + userInfo.token;
      }
    }
    return req;
  },
  (err) => {
    ElMessage.error(ExceptionCode[9999]);
    return Promise.reject(ExceptionCode[9999]);
  },
);

// 拦截响应
service.interceptors.response.use(
  (res) => {
    const { code, msg, data } = res.data;
    if (code === 200) {
      return data;
    } else if (code === 40001) {
      // ElMessage.error(msg);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      return Promise.reject(msg);
    } else {
      // ElMessage.error(ExceptionCode[code] || msg);
      return Promise.reject(ExceptionCode[code] || msg);
    }
  },
  (err) => {
    // ElMessage.error(ExceptionCode[9999]);
    return Promise.reject(ExceptionCode[9999]);
  },
);

const request = (options) => {
  options.method = options.method || 'get';
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data;
  }
  let mock = EnvConfig.mock;
  if (typeof options.mock != 'undefined') {
    mock = options.mock;
  }
  console.log(EnvConfig.env.toLowerCase());
  if (EnvConfig.env.toLowerCase() === 'prod') {
    service.defaults.baseURL = EnvConfig.baseApi;
  } else {
    service.defaults.baseURL = mock ? EnvConfig.mockApi : EnvConfig.baseApi;
  }
  return service(options);
};

['post', 'get', 'put', 'patch', 'delete'].forEach((item) => {
  request[item] = (url, data, options) => {
    request({
      url,
      data,
      method: item,
      ...options,
    });
  };
});

export default request;
