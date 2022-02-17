import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'
import Login from '@/views/Login/login.vue'
import Layout from '@/layout/layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        redirect: '/home/index'
      },
      {
        path: '/home/index',
        name: 'HomeIndex',
        meta: {},
        component: Home
      }
    ]
  },
  {
    path: '/list',
    component: Layout,
    children: [
      {
        path: '/list',
        redirect: '/list/search-table'
      },
      {
        path: '/list/search-table',
        name: 'SearchTable',
        meta: {},
        component: () => import('@/views/List/searchTable.vue')
      }
    ]
  },
  {
    path: '/axios',
    name: 'Axios',
    component: () => import('@/views/axios.vue') // 懒加载组件
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('@/layout/layout.vue') // 懒加载组件
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
