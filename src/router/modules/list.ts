import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/layout.vue'

const listRoute: RouteRecordRaw = {
  path: '/list',
  name: 'List',
  component: Layout,
  redirect: '/list/card-list',
  children: [
    {
      path: '/list/search-table',
      name: 'SearchTable',
      meta: {
        name: '查询表格',
        openKey: '/list'
      },
      component: () => import('@/views/List/searchTable.vue')
    },
    {
      path: '/list/card-list',
      name: 'CardList',
      meta: {
        name: '卡片列表',
        openKey: '/list'
      },
      component: () => import('@/views/List/cardList.vue')
    }
  ]
}

export default listRoute
