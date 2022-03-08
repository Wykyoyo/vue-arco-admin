import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/layout.vue'

const blogRoute: RouteRecordRaw = {
  path: '/blog',
  name: 'Blog',
  component: Layout,
  redirect: '/blog/md-editor-v3',
  children: [
    {
      path: '/blog/md-editor-v3',
      name: 'MdEditorV3',
      meta: {},
      component: () => import('@/views/Blog/mdEditorV3.vue')
    }
  ]
}

export default blogRoute
