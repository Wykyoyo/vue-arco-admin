import { defineStore } from 'pinia'

interface ITagNavList {
  path: string
  name: string
  params: any
  query: any
  meta: any
}
interface stateModel {
  tagNavList: ITagNavList[]
}

const menuStore = defineStore('menu', {
  state: (): stateModel => ({
    tagNavList: []
  }),
  actions: {
    addTagNav({
      path,
      name,
      params,
      query,
      meta
    }: {
      path: string
      name: string
      params: any
      query: any
      meta: any
    }) {
      const route = { path, name, params, query, meta }
      const index = this.tagNavList.findIndex((item) => item.path === path)
      if (index !== -1) {
        this.tagNavList.push(route)
        localStorage.setItem('tagNavList', JSON.stringify(this.tagNavList))
      }
    }
  }
})

export default menuStore
