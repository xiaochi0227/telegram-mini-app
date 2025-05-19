import { http } from '../utils/request';
import type { ApiResponse, AccountPasswrodParams, ChangeAccountPasswrodParams } from './types';

export const balanceApi = {
  // 获取余额首页
  getBalanceIndex: () => http.get<ApiResponse>('/userBalance/index'),

  // 获取当前最新的汇率信息
  getLastExchangeRate: () => http.get<ApiResponse>('/userBalance/getLastExchangeRate'),

  // 获取充值记录
  getRechargeRecords: (params?: {
    page?: number;
    limit?: number;
    add_time: [];
    serial_no: string;
  }) => http.post<ApiResponse>('/userBalance/userRechargeRecord', params),

  // 获取消费记录
  getWithdrawRecords: (params?: {
    page?: number;
    limit?: number;
    add_time: string[];
    change_type_arr: number[];
    serial_no: string;
  }) => http.post<ApiResponse>('/userBalance/userConsumptionRecord', params),

  // 获取充值页面列表
  getBalanceRecords: () => http.get<ApiResponse>('/purchaseOrder/getRechargePage'),

  // 是否存在支付密码
  hasPayPassword: () => http.get<ApiResponse>('/userBalance/hasPayPassword'),

  // 设置支付密码
  setBalancePassword: (params: AccountPasswrodParams) =>
    http.post<ApiResponse>('/userBalance/setPayPassword', params),

  // 修改支付密码
  modifyBalancePassword: (params: ChangeAccountPasswrodParams) =>
    http.post<ApiResponse>('/userBalance/changePayPassword', params),
};
