import type { ApiResponse, LoginParams, LoginResponse, RegisterParams } from './types';
import { http } from '../utils/request';

export const authApi = {
  // 登录
  login: (params: LoginParams) => http.post<ApiResponse<LoginResponse>>('/user/login', params),

  // 注册
  register: (params: RegisterParams) => http.post<ApiResponse<void>>('/user/register', params),

  // 用户退出
  logout: () => http.post<ApiResponse<void>>('/auth/logout'),
};
