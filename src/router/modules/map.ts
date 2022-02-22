import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/layout.vue'

const mapRoute: RouteRecordRaw = {
  path: '/map',
  name: 'Map',
  component: Layout,
  redirect: '/map/base-map',
  children: [
    {
      path: '/map/base-map',
      name: 'BaseMap',
      meta: {},
      component: () => import('@/views/Map/baseMap.vue')
    }
  ]
}

export default mapRoute
