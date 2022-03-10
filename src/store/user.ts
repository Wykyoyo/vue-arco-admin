import { defineStore } from 'pinia'

export interface IUserInfo {
  userName: string
}

interface IState {
  userInfo: IUserInfo
  token: string
  refreshToken: string
}

const useUserStore = defineStore('user', {
  state: () =>
    ({
      userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo') as string)
        : { userName: '' },
      token: '',
      refreshToken: ''
    } as IState),
  actions: {
    updateUserInfo(userInfo: IUserInfo) {
      this.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    updateToken(token: string, refreshToken: string) {
      this.token = token
      this.refreshToken = refreshToken
    },
    logout() {
      this.userInfo = {
        userName: ''
      }
      localStorage.removeItem('userInfo')
    }
  }
})

export default useUserStore
