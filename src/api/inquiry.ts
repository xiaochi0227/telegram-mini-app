import type { ApiResponse, InquiryParams, InquiryResponse } from './types';
import { http } from '../utils/request';

export const inquiryApi = {
  // Submit a new inquiry
  submit: (params: InquiryParams) => http.post<ApiResponse<InquiryResponse>>('/inquiries', params),

  // Get inquiry list
  getList: (params?: { page?: number; pageSize?: number }) =>
    http.get<
      ApiResponse<{
        items: InquiryResponse[];
        total: number;
      }>
    >('/inquiries', { params }),

  // Get inquiry detail
  getDetail: (id: string) => http.get<ApiResponse<InquiryResponse>>(`/inquiries/${id}`),

  // Delete inquiry
  delete: (id: string) => http.delete<ApiResponse<void>>(`/inquiries/${id}`),

  uploadImage: (params: any) =>
    http.post('/ajax/getOss', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  // Update inquiry status

  addInquirySheet: (params: InquiryParams) =>
    http.post<ApiResponse<InquiryResponse>>('/inquirySheet/add', params),

  getExcelTemplate: () => http.get<ApiResponse<InquiryResponse>>(`/inquirySheet/getExcelTemplate`),

  uploadExcel: (params: any) =>
    http.post('/inquirySheet/uploadExcel', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  // 获取参考连接
  websiteExample: (params: any) =>
    http.post<
      ApiResponse<{
        list: [];
      }>
    >(`/websiteExample/index`, params),
  /** ******************** 我的询价 */

  // 获取我的询价列表  '1' => '待报价', '2' => '报价中', '3' => '报价完成'
  getMyInquiryList: (params?: { page?: number; limit?: number; order_status: number | string }) =>
    http.get<
      ApiResponse<{
        list: [];
        total: number;
      }>
    >('/inquirySheet/index', { params }),

  // 获取我的询价详情
  getMyInquiryDetail: (id: string) =>
    http.get<ApiResponse<InquiryResponse>>(`/inquirySheetItem/getItem`, {
      params: { inquiry_sheet_id: id },
    }),

  // 购物车生成订单
  saveFroCart: (params: any) => http.post(`/purchaseOrder/saveFroCart`, params),

  // 询价单生成订单
  addOrderByInquirySheet: (params: any) =>
    http.post<ApiResponse>('/purchaseOrder/saveFromInquirySheet', params),

  // 订单详情界面
  getItemFromDifferentSource: (params: any) =>
    http.post<ApiResponse>('/inquirySheetItem/getItemFromDifferentSource', params),

  // 根据需求单id获取收货地址信息
  getShippingAddress: (params: any) =>
    http.get<ApiResponse>('/purchaseOrder/getShippingAddress', { params }),

  // 获取支付页信息
  getPendingPayment: (params: any) =>
    http.get<ApiResponse>('/purchaseOrder/getPendingPayment', { params }),

  // 订单支付
  payOrder: (params: any) => http.post<ApiResponse>('/purchaseOrder/payOrder', params),

  // 货币兑换
  exchangeCurrency: (params: any) =>
    http.post<ApiResponse>('/purchaseOrder/exchangeCurrency', params),
};
