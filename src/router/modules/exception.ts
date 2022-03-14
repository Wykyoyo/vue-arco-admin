import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/layout.vue'

const exceptionRoute: RouteRecordRaw = {
  path: '/exception',
  name: 'Exception',
  component: Layout,
  redirect: '/exception/403',
  children: [
    {
      path: '/exception/403',
      name: 'Exception-403',
      meta: {
        name: '无权限访问（403）',
        openKey: '/exception'
      },
      component: () => import('@/views/Exception/403.vue')
    },
    {
      path: '/exception/404',
      name: 'Exception-404',
      meta: {
        name: '未找到页面（404）',
        openKey: '/exception'
      },
      component: () => import('@/views/Exception/404.vue')
    },
    {
      path: '/exception/500',
      name: 'Exception-500',
      meta: {
        name: '服务器异常（500）',
        openKey: '/exception'
      },
      component: () => import('@/views/Exception/500.vue')
    }
  ]
}

export default exceptionRoute
