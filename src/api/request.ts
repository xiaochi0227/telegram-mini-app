import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从 Telegram WebApp 获取 initData
    const initData = window.Telegram?.WebApp?.initData;
    
    if (initData) {
      config.headers['X-Telegram-Init-Data'] = initData;
    }

    const locale = localStorage.getItem('locale') || 'russian'

    // Add language to headers
    config.headers['Think-Lang'] = locale == 'zh' ? 'zh-cn' : 'ru'

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    // 这里可以根据后端的响应结构进行相应的处理
    if (res.code !== 0) {
      // 处理错误情况
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error) => {
    // 处理 HTTP 错误状态
    let message = 'Request Error';
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = 'Unauthorized';
          break;
        case 403:
          message = 'Forbidden';
          break;
        case 404:
          message = 'Not Found';
          break;
        case 500:
          message = 'Internal Server Error';
          break;
        default:
          message = `Error: ${error.response.status}`;
      }
    }
    return Promise.reject(new Error(message));
  }
);

export default service; 