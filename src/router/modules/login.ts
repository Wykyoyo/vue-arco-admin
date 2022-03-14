import { RouteRecordRaw } from 'vue-router'

export const loginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login/login.vue')
}

export const forgotRoute: RouteRecordRaw = {
  path: '/forgot',
  name: 'Forgot',
  component: () => import('@/views/Login/forgot.vue')
}

export const registerRoute: RouteRecordRaw = {
  path: '/register',
  name: 'Register',
  component: () => import('@/views/Login/register.vue')
}

export const notfoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)',
  name: 'NotFound',
  component: () => import('@/views/exception/404.vue')
}
