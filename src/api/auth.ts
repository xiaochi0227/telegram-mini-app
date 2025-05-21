import type { ApiResponse, TgLoginParams, TgCodeParams, LoginParams, LoginResponse, RegisterParams } from './types';
import { http } from '../utils/request';

export const authApi = {
  // 用户信息校验
  tgUserCheck: (params: LoginParams) => http.post<ApiResponse<LoginResponse>>('/tgUser/tgUserCheck', params),

  // 选择登录对应的pakupay账号 默认登录的时候不传user_id
  tgLogin: (params: TgLoginParams) => http.post<ApiResponse<LoginResponse>>('/tgUser/tgLogin', params),

  // 获取TG账号列表
  getUserList: (params: any) => http.post<ApiResponse<LoginResponse>>('/tgUser/getUserList', params),

  // 获取TG验证码
  getTgChatCode: (params: TgCodeParams) => http.post<ApiResponse<LoginResponse>>('/tgUser/getTgChatCode', params),

  // 获取图片验证码
  getVerificationCode: () => http.get<ApiResponse<LoginResponse>>('/user/getVerificationCode'),
  
  // 登录
  login: (params: LoginParams) => http.post<ApiResponse<LoginResponse>>('/tgUser/login', params),

  // 注册
  register: (params: RegisterParams) => http.post<ApiResponse<void>>('/tgUser/register', params),

  // 用户退出
  logout: () => http.post<ApiResponse<void>>('/auth/logout'),
};
