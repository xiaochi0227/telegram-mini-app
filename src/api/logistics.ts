import type { ApiResponse } from './types';
import { http } from '../utils/request';

export const logisticsApi = {
  // 获取我的列表
  getLogisticsList: (params?: {
    page?: number;
    limit?: number;
    tracking_status: number | string;
  }) =>
    http.post<
      ApiResponse<{
        list: [];
        total: number;
      }>
    >('/transPortBill/index', params),

  // 物流订单详情
  getLogisticsDetail: (params: any) => http.post('/transPortBill/getDetail', params),

  // 发货单详情
  getBillExcelInfo: (params: any) => http.post('/transPortBill/getBillExcelInfo', params),
};
