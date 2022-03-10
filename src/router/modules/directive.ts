import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/layout.vue'

const directiveRoute: RouteRecordRaw = {
  path: '/directive',
  name: 'Directive',
  component: Layout,
  redirect: '/directive/copy-directive',
  children: [
    {
      path: '/directive/copy-directive',
      name: 'CopyDirective',
      meta: {
        name: '复制指令',
        openKey: '/directive'
      },
      component: () => import('@/views/Directives/copyDirective.vue')
    }
  ]
}

export default directiveRoute
