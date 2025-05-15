import { http } from '../utils/request';
import type { ApiResponse } from './types';

export const carApi = {
    //获取购物车商品
    getCarList: (params: any) =>
        http.get(`/cart/index`, { params }),

    //编辑购物车
    editCart: (params: any) =>
        http.post(`/cart/edit`, params),

    // 添加购物车
    addCart: (params: any) =>
        http.post<ApiResponse>('/cart/add', params),

    // 移除购物车
    delCart: (params: any) =>
        http.post<ApiResponse>('/cart/del', params),
};