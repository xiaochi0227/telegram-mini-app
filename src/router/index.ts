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
      title: '账户中心',
      // showback: true,
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
      showback:true,
    },
  },
  {
    path: '/account/finance/pay-password',
    name: 'PayPassword',
    component: () => import('../views/account/pay-password.vue'),
    meta: {
      title: '设置支付密码',
      requiresAuth: false,
      showback:true,
    },
  },
  {
    path: '/account/finance/recharge',
    name: 'Recharge',
    component: () => import('../views/account/recharge.vue'),
    meta: {
      title: '充值',
      requiresAuth: false,
      showback:true,
    },
  },
  {
    path: '/account/purchase',
    name: 'Purchase',
    component: () => import('../views/account/purchase.vue'),
    meta: {
      title: '采购订单',
      requiresAuth: false,
    },
  },
  {
    path: '/account/purchase/:id',
    name: 'PurchaseOrder',
    component: () => import('../views/account/purchase-order.vue'),
    meta: {
      title: '采购订单详情',
      requiresAuth: false,
      showback:true,
    },
  },
  {
    path: '/account/purchase/purchase-info',
    name: 'PurchaseInfo',
    component: () => import('../views/account/purchase-info.vue'),
    meta: {
      title: '采购信息',
      requiresAuth: false,
      showback:true,
    },
  },
  {
    path: '/account/purchase/purchase-ads',
    name: 'PurchaseOrder',
    component: () => import('../views/account/purchase-ads.vue'),
    meta: {
      title: '地址信息',
      requiresAuth: false,
      showback:true,
    },
  },
  {
    path: '/account/logistics',
    name: 'Logistics',
    component: () => import('../views/account/logistics.vue'),
    meta: {
      title: '物流订单',
      requiresAuth: false,
    },
  },
  {
    path: '/account/logistics/:id',
    name: 'LogisticsOrder',
    component: () => import('../views/account/logistics-order.vue'),
    meta: {
      title: '物流订单详情',
      requiresAuth: false,
      showback:true,
    },
  },
  {
    path: '/account/logistics/detail',
    name: 'LogisticsDetail',
    component: () => import('../views/account/logistics-detail.vue'),
    meta: {
      title: '物流详情',
      requiresAuth: false,
      showback:true,
    },
  },
  {
    path: '/account/logistics/goods',
    name: 'Goods',
    component: () => import('../views/account/goods.vue'),
    meta: {
      title: '运输商品',
      requiresAuth: false,
      showback:true,
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