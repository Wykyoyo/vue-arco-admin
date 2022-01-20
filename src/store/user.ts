import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    count: 0
  }),
  actions: {
    updateCount(count: number) {
      this.count += count
    }
  }
})

export default useUserStore
