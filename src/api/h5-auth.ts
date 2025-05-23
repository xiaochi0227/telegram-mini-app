import type { ApiResponse, LoginParams, LoginResponse, RegisterParams } from './types';
import { http } from '../utils/request';

export const h5AuthApi = {
  // 获取图片验证码
  getVerificationCode: () => http.get<ApiResponse<LoginResponse>>('/user/getVerificationCode'),

  // 登录
  login: (params: LoginParams) => http.post<ApiResponse<LoginResponse>>('/user/login', params),

  // 注册
  register: (params: RegisterParams) => http.post<ApiResponse<void>>('/user/register', params),

  // 用户退出
  logout: () => http.post<ApiResponse<void>>('/user/logout'),

  // 获取邮箱验证码
  getEmailCode: (params: any) => http.post<ApiResponse<void>>('/user/getEmailCode', params),

  // 获取短信验证码
  getSmsCode: (params: any) => http.post<ApiResponse<void>>('/user/getSmsCode', params),
};
