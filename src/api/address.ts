import { http } from '../utils/request';
import type { ApiResponse, AddressListParams, AddressListResponse, AddressConfigParams, Address } from './types';

export const addressApi = {
	// 获取收货地址列表
  getAddressList: (params: AddressListParams) =>
    http.get<ApiResponse<AddressListResponse>>('/userAddress/index', {params}),

	// 获取区域配置			
	getAddressConfig: (params: AddressConfigParams) =>
		http.get<ApiResponse>(`/userAddress/getAddressConfig`, { params }),

	// 添加收货地址
	addAddress: (params: Address) =>
		http.post<ApiResponse>('/userAddress/add', params),

	// 编辑收货地址
	editAddress: (params: Address) =>
		http.post<ApiResponse>('/userAddress/edit', params),

	// 删除收货地址			
	deleteAddress: (ids: string[]) =>
		http.get<ApiResponse<void>>(`/userAddress/del`, { params: {ids} }),
	
	// 设置默认收货地址
	setDefaultAddress: (id: string) =>
		http.get<ApiResponse<void>>(`/userAddress/setDefault`, { params: {id} }),
};