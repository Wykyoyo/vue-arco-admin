import blogRoute from './modules/blog'
import dashboardRoute from './modules/dashboard'
import homeRoute from './modules/home'
import listRoute from './modules/list'
import { loginRoute, forgotRoute, registerRoute } from './modules/login'
import mapRoute from './modules/map'

export default [
  homeRoute,
  listRoute,
  mapRoute,
  loginRoute,
  forgotRoute,
  registerRoute,
  dashboardRoute,
  blogRoute
]
