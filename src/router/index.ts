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