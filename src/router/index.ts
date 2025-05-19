import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/account/center',
    name: 'Account',
    component: () => import('../views/account/account.vue'),
    meta: {
      title: '账户中心'
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/cart/index.vue'),
    meta: {
      title: '购物车',
      showBack: true
    },
  },
  {
    path: '/shipping',
    name: 'Shipping',
    component: () => import('../views/order/shipping.vue'),
    meta: {
      title: '确认运输要求',
      showBack: true,
    },
  },
  {
    path: '/goods',
    name: 'Goods',
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
      title: '地址信息',
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
      title: '编辑地址',
      showBack: true
    },
  },
  {
    path: '/memo',
    name: 'Memo',
    component: () => import('../views/address/memo.vue'),
    meta: {
      title: '包装与配送要求',
      showBack: true
    },
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: () => import('../views/order/confirm.vue'),
    meta: {
      title: '订单确认',
      showBack: true,
    },
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/order/payment.vue'),
    meta: {
      title: '支付',
      showBack: true,
    },
  },
  {
    path: '/complete',
    name: 'Complete',
    component: () => import('../views/order/complete.vue'),
    meta: {
      title: '支付成功',
      showBack: true,
    },
  },
  {
    path: '/recharge',
    name: 'Recharge',
    component: () => import('../views/recharge.vue'),
    meta: {
      title: '充值',
      showBack: true,
    },
  },
  {
    path: '/inquiry',
    name: 'Inquiry',
    component: () => import('../views/inquiry/index.vue'),
    meta: {
      title: '我的询价'
    },
  },
  {
    path: '/inquiry-detail',
    name: 'InquiryDetail',
    component: () => import('../views/inquiry/detail.vue'),
    meta: {
      title: '询价详情',
      showBack: true,
    },
  },
  {
    path: '/goods-detail',
    name: 'GoodsDetail',
    component: () => import('../views/inquiry/goods-detail.vue'),
    meta: {
      title: '商品详情',
      showBack: true,
    },
  },
  {
    path: '/inquiry-info',
    name: 'InquiryInfo',
    component: () => import('../views/inquiry/inquiry-info.vue'),
    meta: {
      title: '询价详情',
      showBack: true,
    },
  },
  {
    path: '/account/finance',
    name: 'Finance',
    component: () => import('../views/account/finance.vue'),
    meta: {
      title: '资金管理',
      requiresAuth: false,
    },
  },
  {
    path: '/account/finance/operation-records',
    name: 'FinanceList',
    component: () => import('../views/account/finance-list.vue'),
    meta: {
      title: '资金明细',
      requiresAuth: false,
      showBack: true,
    },
  },
  {
    path: '/account/finance/pay-password',
    name: 'PayPassword',
    component: () => import('../views/account/pay-password.vue'),
    meta: {
      title: '设置支付密码',
      requiresAuth: false,
      showBack:true,
    },
  },
  {
    path: '/account/finance/recharge',
    name: 'Recharge',
    component: () => import('../views/account/recharge.vue'),
    meta: {
      title: '充值',
      requiresAuth: false,
      showBack:true,
    },
  },
  {
    path: '/account/purchase',
    name: 'Purchase',
    component: () => import('../views/purchase/purchase.vue'),
    meta: {
      title: '采购订单',
      requiresAuth: false,
    },
  },
  {
    path: '/account/purchase/:id',
    name: 'PurchaseOrder',
    component: () => import('../views/purchase/purchase-order.vue'),
    meta: {
      title: '采购订单详情',
      requiresAuth: false,
      showBack:true,
    },
  },
  {
    path: '/account/purchase/purchase-info',
    name: 'PurchaseInfo',
    component: () => import('../views/purchase/purchase-info.vue'),
    meta: {
      title: '采购信息',
      requiresAuth: false,
      showBack:true,
    },
  },
  {
    path: '/account/purchase/purchase-ads',
    name: 'PurchaseAds',
    component: () => import('../views/purchase/purchase-ads.vue'),
    meta: {
      title: '地址信息',
      requiresAuth: false,
      showBack:true,
    },
  },
  {
    path: '/account/logistics',
    name: 'Logistics',
    component: () => import('../views/logistics/logistics.vue'),
    meta: {
      title: '物流订单',
      requiresAuth: false,
    },
  },
  {
    path: '/account/logistics/:id',
    name: 'LogisticsOrder',
    component: () => import('../views/logistics/logistics-order.vue'),
    meta: {
      title: '物流订单详情',
      requiresAuth: false,
      showBack:true,
    },
  },
  {
    path: '/account/logistics/detail',
    name: 'LogisticsDetail',
    component: () => import('../views/logistics/logistics-detail.vue'),
    meta: {
      title: '物流详情',
      requiresAuth: false,
      showBack:true,
    },
  },
  {
    path: '/account/logistics/goods',
    name: 'Goods',
    component: () => import('../views/goods.vue'),
    meta: {
      title: '运输商品',
      requiresAuth: false,
      showBack:true,
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