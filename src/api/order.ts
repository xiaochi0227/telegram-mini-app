import type { ApiResponse } from './types';
import { http } from '../utils/request';

export const orderApi = {
  // 获取我的列表
  getMyOrderList: (params?: { page?: number; limit?: number; order_status: number }) =>
    http.get<
      ApiResponse<{
        list: [];
        total: number;
      }>
    >('/PurchaseOrder/index', { params }),

  // 物流动态
  geTransportLog: (params?: { page?: number; limit?: number }) =>
    http.get<
      ApiResponse<{
        list: [];
        total: number;
      }>
    >('/userAccount/geTransportLog', { params }),

  // 获取付款之后的订单详情页
  getPaidOrderDetail: (purchase_order_id: string) =>
    http.post<ApiResponse>('/purchaseOrder/getPaidOrderDetail', { purchase_order_id }),

  // 获取需求单详情
  getPurchaseOrderDetail: (params: any) =>
    http.post<ApiResponse>('/purchaseOrder/getPurchaseOrderDetail', params),

  // 重新下单
  copyPurchaseOrder: (params: any) =>
    http.post<ApiResponse>('/purchaseOrder/copyPurchaseOrder', params),
};
