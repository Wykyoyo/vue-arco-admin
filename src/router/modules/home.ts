import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/layout.vue'

const homeRoute: RouteRecordRaw = {
  path: '/',
  name: 'Home',
  redirect: '/home',
  component: Layout,
  children: [
    {
      path: '/home',
      name: 'HomeIndex',
      meta: {
        name: '首页',
        openKey: '/'
      },
      component: () => import('@/views/home.vue')
    }
  ]
}

export default homeRoute
