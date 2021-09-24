import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/components/Home.vue'),
    redirect: '/welcome',
    meta: {
      title: '首页',
    },
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        component: () => import('@/views/Welcome.vue'),
        meta: {
          title: '欢迎页',
        },
      },
      {
        name: 'user',
        path: '/system/user',
        component: () => import('@/views/User.vue'),
        meta: {
          title: '用户管理',
        },
      },
      {
        name: 'menu',
        path: '/system/menu',
        component: () => import('@/views/Menu.vue'),
        meta: {
          title: '菜单管理',
        },
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录页',
    },
    component: () => import('@/views/Login.vue'),
  },
];
let router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
