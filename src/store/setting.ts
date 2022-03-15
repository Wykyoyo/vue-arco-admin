import { defineStore } from 'pinia'

interface stateModel {
  darkMode: 'dark' | 'light'
  clientWidth: number
}

const useSettingStore = defineStore('setting', {
  state: (): stateModel => ({
    darkMode: (localStorage.getItem('darkMode') as 'dark' | 'light') ?? 'light',
    clientWidth: document.documentElement.clientWidth
  }),
  actions: {
    updateDarkMode(value: 'dark' | 'light') {
      localStorage.setItem('darkMode', value)
      this.darkMode = value
    },
    updateClientWidth(value: number) {
      this.clientWidth = value
    }
  }
})

export default useSettingStore
