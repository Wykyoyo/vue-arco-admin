import { defineStore } from 'pinia'

interface stateModel {
  darkMode: 'dark' | 'light'
}

const useSettingStore = defineStore('setting', {
  state: (): stateModel => ({
    darkMode: (localStorage.getItem('darkMode') as 'dark' | 'light') ?? 'light'
  }),
  actions: {
    updateDarkMode(value: 'dark' | 'light') {
      localStorage.setItem('darkMode', value)
      this.darkMode = value
    }
  }
})

export default useSettingStore
