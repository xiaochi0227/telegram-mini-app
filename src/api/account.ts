import type {
  AccountPasswrodParams,
  AccountSettingParams,
  ApiResponse,
  FeedbackForm,
} from './types';
import { http } from '../utils/request';

export const accountApi = {
  // 获取账户中心首页
  getAccountIndex: () => http.get<ApiResponse>('/userAccount/index'),

  // 获取账户设置信息
  getAccountData: () => http.get<ApiResponse>('/userAccount/getAccount'),

  // 绑定手机号/邮箱
  bindUsername: (params: any) => http.post<ApiResponse>('/userAccount/bindUsername', params),

  // 账户信息设置
  setAccountData: (params: AccountSettingParams) =>
    http.post<ApiResponse>('/userAccount/setAccount', params),

  // 账户密码设置
  setAccountPassword: (params: AccountPasswrodParams) =>
    http.post<ApiResponse>('/userAccount/changeLoginPassword', params),

  // 获取资质管理数据
  getQualificationData: () => http.get<ApiResponse>('/userAccount/getQualification'),

  // 资质信息设置
  setQualificationData: (params: any) =>
    http.post<ApiResponse>('/userAccount/setUserQualification', params),

  // 问题反馈
  saveUserSuggestion: (params: FeedbackForm) =>
    http.post<ApiResponse>('/userAccount/saveUserSuggestion', params),
};
