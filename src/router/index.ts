import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import i18n from '../plugins/i18n';
import { useUser } from '@/hooks/user';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Home',
      active: 'home'
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: {
      title: 'header.back',
      showBack: true
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/index.vue'),
    meta: {
      title: 'header.back',
      showBack: true
    },
  },
  {
    path: '/inquiry',
    name: 'Inquiry',
    component: () => import('../views/inquiry/index.vue'),
    meta: {
      title: 'header.purchaseOrder',
      active: 'inquiry',
      keepAlive: true
    },
  },
  {
    path: '/goods-picture',
    name: 'GoodsPicture',
    component: () => import('../views/inquiry/goods-picture.vue'),
    meta: {
      title: 'inquiry.picture',
      active: 'inquiry',
      showBack: true,
    },
  },
  {
    path: '/inquiry-success',
    name: 'InquirySuccess',
    component: () => import('../views/inquiry/success.vue'),
    meta: {
      title: 'inquiry.success',
      active: 'inquiry',
      showBack: true,
    },
  },
  {
    path: '/account/center',
    name: 'Account',
    component: () => import('../views/account/account.vue'),
    meta: {
      title: 'nav.account',
      active: 'user',
      requiresAuth: true
    },
  },
  {
    path: '/account/info',
    name: 'AccountInfo',
    component: () => import('../views/account/info/index.vue'),
    meta: {
      title: 'login.accountInfo',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/change',
    name: 'AccountChange',
    component: () => import('../views/account/change/index.vue'),
    meta: {
      title: '切换账号',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/cart/index.vue'),
    meta: {
      title: 'cart.title',
      active: 'cart',
      requiresAuth: true
    },
  },
  {
    path: '/shipping',
    name: 'Shipping',
    component: () => import('../views/order/shipping.vue'),
    meta: {
      title: 'cart.confirmShipping',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/goods',
    name: 'OrderGoods',
    component: () => import('../views/order/goods.vue'),
    meta: {
      title: 'order.goodsInfo',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/order/address.vue'),
    meta: {
      title: 'orderDetail.adsInfo',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/address-list',
    name: 'AddressList',
    component: () => import('../views/address/address-list.vue'),
    meta: {
      title: 'order.selectAddress',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/edit-address',
    name: 'EditAddress',
    component: () => import('../views/address/edit-address.vue'),
    meta: {
      title: 'address.edit',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/memo',
    name: 'Memo',
    component: () => import('../views/address/memo.vue'),
    meta: {
      title: 'checkout.packagingRequirements',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: () => import('../views/order/confirm.vue'),
    meta: {
      title: 'cart.confirmOrder',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/order/payment.vue'),
    meta: {
      title: 'cart.payment',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/excharge',
    name: 'Excharge',
    component: () => import('../views/order/excharge.vue'),
    meta: {
      title: 'payment.exchange',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/complete',
    name: 'Complete',
    component: () => import('../views/order/complete.vue'),
    meta: {
      title: 'checkout.paymentSuccess',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/recharge',
    name: 'Recharge',
    component: () => import('../views/recharge.vue'),
    meta: {
      title: 'accountCenter.recharge',
      showBack: true
    },
  },
  {
    path: '/account/inquiry',
    name: 'AccountInquiry',
    component: () => import('../views/account/inquiry/index.vue'),
    meta: {
      title: 'menu.inquiries',
      active: 'user',
      requiresAuth: true
    },
  },
  {
    path: '/account/inquiry-detail',
    name: 'InquiryDetail',
    component: () => import('../views/account/inquiry/detail.vue'),
    meta: {
      title: 'myInquiries.inquiry_details',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/goods-detail',
    name: 'GoodsDetail',
    component: () => import('../views/account/inquiry/goods-detail.vue'),
    meta: {
      title: 'order.goodsDetail',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/inquiry-info',
    name: 'InquiryInfo',
    component: () => import('../views/account/inquiry/inquiry-info.vue'),
    meta: {
      title: 'myInquiries.inquiry_details',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/finance',
    name: 'Finance',
    component: () => import('../views/account/finance/finance.vue'),
    meta: {
      title: 'menu.finance',
      active: 'user',
      requiresAuth: true
    },
  },
  {
    path: '/account/finance/operation-records',
    name: 'FinanceList',
    component: () => import('../views/account/finance/finance-list.vue'),
    meta: {
      title: 'accountCenter.fundDetail',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/finance/pay-password',
    name: 'PayPassword',
    component: () => import('../views/account/finance/pay-password.vue'),
    meta: {
      title: 'finance.payPassword',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/purchase',
    name: 'Purchase',
    component: () => import('../views/account/purchase/purchase.vue'),
    meta: {
      title: 'menu.orders',
      active: 'user',
      requiresAuth: true
    },
  },
  {
    path: '/account/purchase/:id',
    name: 'PurchaseOrder',
    component: () => import('../views/account/purchase/purchase-order.vue'),
    meta: {
      title: '采购订单详情',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/purchase/purchase-info',
    name: 'PurchaseInfo',
    component: () => import('../views/account/purchase/purchase-info.vue'),
    meta: {
      title: 'orderDetail.purchaseInfo',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/purchase/purchase-ads',
    name: 'PurchaseAds',
    component: () => import('../views/account/purchase/purchase-ads.vue'),
    meta: {
      title: 'orderDetail.adsInfo',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/purchase/purchase-voucher',
    name: 'PurchaseVoucher',
    component: () => import('../views/account/purchase/purchase-voucher.vue'),
    meta: {
      title: '入库凭证',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/purchase/goods',
    name: 'PurchaseGoods',
    component: () => import('../views/account/purchase/goods.vue'),
    meta: {
      title: 'cart.procurement',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/purchase/payment',
    name: 'PurchaseOrderPayment',
    component: () => import('../views/account/purchase/payment.vue'),
    meta: {
      title: 'order.payEndMoney',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/purchase/payInfo',
    name: 'PurchasePayInfo',
    component: () => import('../views/account/purchase/purchase-payInfo.vue'),
    meta: {
      title: 'orderDetail.payInfo',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/logistics',
    name: 'Logistics',
    component: () => import('../views/account/logistics/logistics.vue'),
    meta: {
      title: 'menu.logistics',
      active: 'user',
      requiresAuth: true
    },
  },
  {
    path: '/account/logistics/:id',
    name: 'LogisticsOrder',
    component: () => import('../views/account/logistics/logistics-order.vue'),
    meta: {
      title: '物流订单详情',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/logistics/detail',
    name: 'LogisticsDetail',
    component: () => import('../views/account/logistics/logistics-detail.vue'),
    meta: {
      title: 'logistics.orderDetail',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/account/logistics/goods',
    name: 'LogisticsGoods',
    component: () => import('../views/account/logistics/goods.vue'),
    meta: {
      title: 'logistics.orderGoods',
      showBack: true,
      requiresAuth: true
    },
  },
  {
    path: '/userAgreement',
    name: 'UserAgreement',
    component: () => import('../views/userAgreement.vue'),
    meta: {
      title: 'login.agreementLink',
      requiresAuth: false,
      showBack: true,
    },
  },
  {
    path: '/privacyPolicy',
    name: 'PrivacyPolicy',
    component: () => import('../views/PrivacyPolicy.vue'),
    meta: {
      title: 'login.privacyLink',
      requiresAuth: false,
      showBack: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '404 Not Found',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  to.meta.title = i18n.global.t(to.meta.title as string) || to.meta.title;
  // 设置页面标题
  document.title = `${to.meta.title} - Telegram Mini App`;

  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    const { user, loading } = useUser()
    if (!user.value || !loading.value) {
      next({ name: 'Login' });
      return;
    }
  }
  next();
});

export default router; 