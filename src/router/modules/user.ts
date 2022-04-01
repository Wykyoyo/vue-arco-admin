import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/layout.vue'

const userRoute: RouteRecordRaw = {
  path: '/user',
  name: 'User',
  component: Layout,
  redirect: '/user/user-setting',
  children: [
    {
      path: '/user/user-setting',
      name: 'UserSetting',
      meta: {
        name: '用户设置',
        openKey: '/user'
      },
      component: () => import('@/views/User/userSetting.vue')
    }
  ]
}

export default userRoute
