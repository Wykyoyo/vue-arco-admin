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
      meta: {},
      component: () => import('@/views/DashBoard/analysis.vue')
    }
  ]
}

export default dashboardRoute
