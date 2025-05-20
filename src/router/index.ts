import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import i18n from '../plugins/i18n';
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
    path: '/inquiry',
    name: 'Inquiry',
    component: () => import('../views/inquiry/index.vue'),
    meta: {
      title: '询价',
      active: 'inquiry'
    },
  },
  {
    path: '/account/center',
    name: 'Account',
    component: () => import('../views/account/account.vue'),
    meta: {
      title: 'nav.account',
      active: 'user'
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/cart/index.vue'),
    meta: {
      title: 'cart.title',
      active: 'cart'
    },
  },
  {
    path: '/shipping',
    name: 'Shipping',
    component: () => import('../views/order/shipping.vue'),
    meta: {
      title: 'cart.confirmShipping',
      showBack: true,
    },
  },
  {
    path: '/goods',
    name: 'OrderGoods',
    component: () => import('../views/order/goods.vue'),
    meta: {
      title: '商品信息',
      showBack: true,
    },
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/order/address.vue'),
    meta: {
      title: 'orderDetail.adsInfo',
      showBack: true,
    },
  },
  {
    path: '/address-list',
    name: 'AddressList',
    component: () => import('../views/address/address-list.vue'),
    meta: {
      title: '选择地址',
      showBack: true
    },
  },
  {
    path: '/edit-address',
    name: 'EditAddress',
    component: () => import('../views/address/edit-address.vue'),
    meta: {
      title: 'address.edit',
      showBack: true
    },
  },
  {
    path: '/memo',
    name: 'Memo',
    component: () => import('../views/address/memo.vue'),
    meta: {
      title: 'checkout.packagingRequirements',
      showBack: true
    },
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: () => import('../views/order/confirm.vue'),
    meta: {
      title: 'cart.confirmOrder',
      showBack: true,
    },
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/order/payment.vue'),
    meta: {
      title: 'cart.payment',
      showBack: true,
    },
  },
  {
    path: '/excharge',
    name: 'Excharge',
    component: () => import('../views/order/excharge.vue'),
    meta: {
      title: 'payment.exchange',
      showBack: true,
    },
  },
  {
    path: '/complete',
    name: 'Complete',
    component: () => import('../views/order/complete.vue'),
    meta: {
      title: 'checkout.paymentSuccess',
      showBack: true,
    },
  },
  {
    path: '/recharge',
    name: 'Recharge',
    component: () => import('../views/recharge.vue'),
    meta: {
      title: 'accountCenter.recharge',
      showBack: true,
    },
  },
  {
    path: '/account/inquiry',
    name: 'AccountInquiry',
    component: () => import('../views/account/inquiry/index.vue'),
    meta: {
      title: 'menu.inquiries',
      active: 'user'
    },
  },
  {
    path: '/account/inquiry-detail',
    name: 'InquiryDetail',
    component: () => import('../views/account/inquiry/detail.vue'),
    meta: {
      title: 'myInquiries.inquiry_details',
      showBack: true,
    },
  },
  {
    path: '/account/goods-detail',
    name: 'GoodsDetail',
    component: () => import('../views/account/inquiry/goods-detail.vue'),
    meta: {
      title: '商品详情',
      showBack: true,
    },
  },
  {
    path: '/account/inquiry-info',
    name: 'InquiryInfo',
    component: () => import('../views/account/inquiry/inquiry-info.vue'),
    meta: {
      title: 'myInquiries.inquiry_details',
      showBack: true,
    },
  },
  {
    path: '/account/finance',
    name: 'Finance',
    component: () => import('../views/account/finance/finance.vue'),
    meta: {
      title: 'menu.finance',
      requiresAuth: false,
      active: 'user'
    },
  },
  {
    path: '/account/finance/operation-records',
    name: 'FinanceList',
    component: () => import('../views/account/finance/finance-list.vue'),
    meta: {
      title: 'accountCenter.fundDetail',
      requiresAuth: false,
      showBack: true
    },
  },
  {
    path: '/account/finance/pay-password',
    name: 'PayPassword',
    component: () => import('../views/account/finance/pay-password.vue'),
    meta: {
      title: 'finance.payPassword',
      requiresAuth: false,
      showBack: true
    },
  },
  {
    path: '/account/purchase',
    name: 'Purchase',
    component: () => import('../views/account/purchase/purchase.vue'),
    meta: {
      title: 'menu.orders',
      requiresAuth: false,
      active: 'user'
    },
  },
  {
    path: '/account/purchase/:id',
    name: 'PurchaseOrder',
    component: () => import('../views/account/purchase/purchase-order.vue'),
    meta: {
      title: '采购订单详情',
      requiresAuth: false,
      showBack: true,
    },
  },
  {
    path: '/account/purchase/purchase-info',
    name: 'PurchaseInfo',
    component: () => import('../views/account/purchase/purchase-info.vue'),
    meta: {
      title: 'orderDetail.purchaseInfo',
      requiresAuth: false,
      showBack: true,
    },
  },
  {
    path: '/account/purchase/purchase-ads',
    name: 'PurchaseAds',
    component: () => import('../views/account/purchase/purchase-ads.vue'),
    meta: {
      title: 'orderDetail.adsInfo',
      requiresAuth: false,
      showBack: true,
    },
  },
  {
    path: '/account/purchase/purchase-voucher',
    name: 'PurchaseVoucher',
    component: () => import('../views/account/purchase/purchase-voucher.vue'),
    meta: {
      title: '入库凭证',
      requiresAuth: false,
      showBack:true,
    },
  },
  {
    path: '/account/purchase/goods',
    name: 'PurchaseGoods',
    component: () => import('../views/account/purchase/goods.vue'),
    meta: {
      title: 'cart.procurement',
      requiresAuth: false,
      showBack:true,
    },
  },
  {
    path: '/account/purchase/payment',
    name: 'PurchaseOrderPayment',
    component: () => import('../views/account/purchase/payment.vue'),
    meta: {
      title: 'rder.payEndMoney',
      requiresAuth: false,
      showBack: true,
    },
  },
  {
    path: '/account/logistics',
    name: 'Logistics',
    component: () => import('../views/account/logistics/logistics.vue'),
    meta: {
      title: 'menu.logistics',
      requiresAuth: false,
      active: 'user'
    },
  },
  {
    path: '/account/logistics/:id',
    name: 'LogisticsOrder',
    component: () => import('../views/account/logistics/logistics-order.vue'),
    meta: {
      title: '物流订单详情',
      requiresAuth: false,
      showBack: true,
    },
  },
  {
    path: '/account/logistics/detail',
    name: 'LogisticsDetail',
    component: () => import('../views/account/logistics/logistics-detail.vue'),
    meta: {
      title: 'logistics.orderDetail',
      requiresAuth: false,
      showBack: true,
    },
  },
  {
    path: '/account/logistics/goods',
    name: 'LogisticsGoods',
    component: () => import('../views/account/logistics/goods.vue'),
    meta: {
      title: 'logistics.orderGoods',
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
      requiresAuth: false,
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
    const webApp = window.Telegram?.WebApp;
    if (!webApp?.initDataUnsafe?.user) {
      next({ name: 'Home' });
      return;
    }
  }
  next();
});

export default router; 