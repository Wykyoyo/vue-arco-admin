import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/layout.vue'

const dashboardRoute: RouteRecordRaw = {
  path: '/dashboard',
  name: 'DashBoard',
  component: Layout,
  redirect: '/dashboard/analysis',
  children: [
    {
      path: '/dashboard/analysis',
      name: 'Analysis',
      meta: {
        name: '数据分析',
        openKey: '/dashboard'
      },
      component: () => import('@/views/DashBoard/analysis.vue')
    }
  ]
}

export default dashboardRoute
