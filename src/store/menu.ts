import { defineStore } from 'pinia'
import {
  LocationQuery,
  RouteLocationNormalizedLoaded,
  RouteMeta,
  RouteParams,
  RouteRecordName
} from 'vue-router'

interface ITagNavList {
  path: string
  name: RouteRecordName | null | undefined
  params: RouteParams
  query: LocationQuery
  meta: RouteMeta
}
interface ICurrentRoute {
  currentRoutePath: string
  openKey: string
}
interface stateModel {
  tagNavList: ITagNavList[]
  currentRoute: ICurrentRoute
}

const BaseTagNavList: ITagNavList[] = [
  {
    path: '/home',
    name: 'HomeIndex',
    params: {},
    query: {},
    meta: {
      name: '首页',
      openKey: '/'
    }
  }
]

const BaseCurrentRoute: ICurrentRoute = {
  currentRoutePath: '/home',
  openKey: '/'
}

const useMenuStore = defineStore('menu', {
  state: (): stateModel => ({
    tagNavList: localStorage.getItem('tagNavList')
      ? JSON.parse(localStorage.getItem('tagNavList') as string)
      : BaseTagNavList,
    currentRoute: localStorage.getItem('currentRoute')
      ? JSON.parse(localStorage.getItem('currentRoute') as string)
      : BaseCurrentRoute
  }),
  actions: {
    addTagNav(route: RouteLocationNormalizedLoaded) {
      const { path, name, params, query, meta } = route
      const newRoute = { path, name, params, query, meta }
      const index = this.tagNavList.findIndex((item) => item.path === path)
      if (index === -1) {
        this.tagNavList.push(newRoute)
        localStorage.setItem('tagNavList', JSON.stringify(this.tagNavList))
      }
    },
    updateCurrentRoutePath(path: string, openKey: string) {
      this.currentRoute = {
        currentRoutePath: path,
        openKey
      }
      localStorage.setItem('currentRoute', JSON.stringify(this.currentRoute))
    }
  }
})

export default useMenuStore
