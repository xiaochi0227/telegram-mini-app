import axios from 'axios';
import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

console.log(import.meta.env.DEV, import.meta.env.VITE_API_BASE_URL)
// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
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

    config.headers['Ba-User-Token'] = '2d5c5202-15d9-4a7f-b21c-3884920a0655'

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
    if (res.code !== 1) {
      // 处理错误情况
      return Promise.reject(new Error(res.msg || 'Error'));
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
          message = `Error: ${error.response.msg}`;
      }
    }
    return Promise.reject(new Error(message));
  }
);

// Request methods with type safety
export const http = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) => service.get<T, T>(url, config),

  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    service.post<T, T>(url, data, config),

  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    service.put<T, T>(url, data, config),

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    service.delete<T, T>(url, config),

  patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    service.patch<T, T>(url, data, config),
}

export default service; 