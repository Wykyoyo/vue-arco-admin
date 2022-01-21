import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    count: 0,
    token: '',
    refreshToken: ''
  }),
  actions: {
    updateCount(count: number) {
      this.count += count
    },
    updateToken(token: string, refreshToken: string) {
      this.token = token
      this.refreshToken = refreshToken
    }
  }
})

export default useUserStore
