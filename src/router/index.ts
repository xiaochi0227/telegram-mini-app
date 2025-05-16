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
    path: '/account',
    name: 'Account',
    component: () => import('../views/account.vue'),
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
    path: '/confirm',
    name: 'Confirm',
    component: () => import('../views/order/confirm.vue'),
    meta: {
      title: '订单确认',
      showBack: true,
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
    path: '/fund-manage',
    name: 'FundManage',
    component: () => import('../views/fund-manage.vue'),
    meta: {
      title: '资金管理',
      requiresAuth: false,
    },
  },
  {
    path: '/fund-list',
    name: 'FundList',
    component: () => import('../views/fund-list.vue'),
    meta: {
      title: '资金明细',
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