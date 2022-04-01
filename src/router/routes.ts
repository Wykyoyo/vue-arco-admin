import blogRoute from './modules/blog'
import dashboardRoute from './modules/dashboard'
import directiveRoute from './modules/directive'
import exceptionRoute from './modules/exception'
import homeRoute from './modules/home'
import listRoute from './modules/list'
import {
  loginRoute,
  forgotRoute,
  registerRoute,
  notfoundRoute
} from './modules/login'
import mapRoute from './modules/map'
import userRoute from './modules/user'

export default [
  homeRoute,
  listRoute,
  mapRoute,
  loginRoute,
  forgotRoute,
  registerRoute,
  dashboardRoute,
  blogRoute,
  directiveRoute,
  exceptionRoute,
  userRoute,
  notfoundRoute
]
