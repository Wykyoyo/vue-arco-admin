import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import useUserStore from '../store/user'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { path } = to
  const userStore = useUserStore()
  if (
    userStore.userInfo.userName === '' &&
    path !== '/login' &&
    path !== '/register' &&
    path !== '/forgot'
  ) {
    next({ path: '/login' })
  }
  next()
})

export default router
