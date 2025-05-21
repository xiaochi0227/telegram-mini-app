// Common response type
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}


export interface TgLoginParams {
  tg_user_id: string,
  user_id?: string;
}

export interface TgCodeParams {
  tg_user_id: string,
  username?: string;
  country_code: string,
}

// User related types
export interface LoginParams {
  tg_user_id: string,
  country_code: string,
  account_type: number,
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface RegisterParams {
  tg_user_id: string,
  country_code: string,
  account_type: number,
  username: string;
  password: string;
  ver_code: string;
}


// Inquiry related types
export interface InquiryItem {
  productName: string;
  quantity: number;
  productLink?: string;
  image?: File;
}

export interface InquiryParams {
  items: InquiryItem[];
  email: string;
  phone: string;
  remarks?: string;
}

export interface InquiryResponse {
  inquiryId: string;
  createdAt: string;
}

// 收货地址类型
export interface Address {
  id: string;
  purchase_order_address_id: number;
  user_address_id: number;
  name: string;
  country_id: string;
  country_code: string;
  country_name: string;
  landline_num: string;
  phone_num: string;
  detail_address: string;
  province_id: string;
  province_name: string;
  city_id: string;
  city_name: string;
  postal_code: string;
  is_default: boolean;
  memo?: string;
}

// 收货地址请求
export interface AddressListParams {
  is_default: string | number;
}

// 收货地址响应
export interface AddressListResponse {
  address_list: Address[];
}

export interface AddressConfigParams {
  type: string; // 1:国家 2:省份 3:市 4:区
  parent_id: string;
}

export interface PreviewImage {
  src: string;
  alt: string;
}

export interface AccountSettingParams {
  username: string;
  telegram: string;
  whatsapp: string;
  facebook: string;
  skype: string;
  email: string;
  phone: string;
}

export interface AccountPasswrodParams {
  password: string;
  repeat_password: string;
}

export interface ChangeAccountPasswrodParams {
  current_password: string;
  new_password: string;
  repeat_password: string;
}

export interface FeedbackForm {
  type: number;
  memo: string;
  images: string[];
}
