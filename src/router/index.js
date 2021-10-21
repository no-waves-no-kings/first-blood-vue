import { createRouter, createWebHashHistory } from 'vue-router';
import Storage from '../utils/storage';
import api from '../api';
import utils from '../utils/utils';
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
  {
    name: '404',
    path: '/404',
    meta: {
      title: '错误页',
    },
    component: () => import('@/views/404.vue'),
  },
];
let router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const modules = import.meta.glob('../views/*.vue');
await asyncLoadRouters();

async function asyncLoadRouters() {
  try {
    let userInfo = Storage.getItem('userInfo') || {};
    if (userInfo.token) {
      // token存在,查询菜单列表
      let { menuList } = await api.getUserPermissionList();
      // 获得route列表
      let routes = utils.generateRoutes(menuList);
      routes.map((r) => {
        r.component = modules[`../views/${r.component}.vue`];
        router.addRoute('home', r);
      });
    }
    // 添加导航守卫
    router.beforeEach((to, from, next) => {
      let userInfo = Storage.getItem('userInfo') || {};
      if (to.path === '/login') {
        next();
      } else {
        if (userInfo.token) {
          if (!router.hasRoute(to.name)) {
            next('/404');
            return;
          }
          document.title = to.meta.title;
          next();
        } else {
          next('/login');
        }
      }
    });
  } catch (e) {}
}

export default router;
