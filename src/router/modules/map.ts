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
      meta: {
        name: '基础地图',
        openKey: '/map'
      },
      component: () => import('@/views/Map/baseMap.vue')
    }
  ]
}

export default mapRoute
