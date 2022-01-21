// 注意该封装方法会根据长短token进行刷新token操作,具体请根据个人实际业务进行修改
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
// import Qs from 'qs'
import router from '../router/index'
import useUserStore from '../store/user'
import { RefreshToken } from '../api/login'

let isRefreshing: Boolean = false // 标识是否正在刷新token
const requests: any[] = [] // 重试队列

interface refreshTokenModal {
  token: string
  refreshToken: string
}

class Request {
  private http: AxiosInstance

  constructor(customConfig: AxiosRequestConfig) {
    this.http = axios.create(customConfig)
    // 请求拦截器
    this.http.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const { token } = useUserStore()
        if (token) {
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = token
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // 响应拦截器
    this.http.interceptors.response.use(
      (response: AxiosResponse) => {
        const { status } = response
        if (status === 401) {
          // Message.error('登录过期,请重新登录!')
          if (!isRefreshing) {
            isRefreshing = true
            RefreshToken()
              .then(
                ({ code, data }: { code: number; data: refreshTokenModal }) => {
                  if (code === 200) {
                    const { token, refreshToken } = data
                    localStorage.setItem('token', `Bearer ${token}`)
                    localStorage.setItem(
                      'refreshToken',
                      `Bearer ${refreshToken}`
                    )
                    useUserStore().updateToken(token, refreshToken)
                    // eslint-disable-next-line no-param-reassign
                    this.http.defaults.headers.common.Authorization = `Bearer ${token}`
                    requests.forEach((item) => {
                      item(token)
                    })
                    return this.http(response.config)
                  }
                  router.push('/Login')
                  return response
                }
              )
              .catch(() => {
                router.push('/Login')
              })
              .finally(() => {
                isRefreshing = false
              })
          } else {
            return new Promise((resolve) => {
              requests.push((token: string) => {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                resolve(this.http(response.config))
              })
            })
          }
        } else if (status === 400 || status === 500) {
          // 返回数据失败
        }
        return response
      },
      (error) => {
        if (error.response?.status === 401) {
          // Message.error('登录过期,请重新登录!')
          if (!isRefreshing) {
            isRefreshing = true
            RefreshToken()
              .then((res) => {
                const {
                  code,
                  data
                }: { code: number; data: refreshTokenModal } = res
                if (code === 200) {
                  const { token, refreshToken } = data
                  localStorage.setItem('token', `Bearer ${token}`)
                  localStorage.setItem('refreshToken', `Bearer ${refreshToken}`)
                  useUserStore().updateToken(token, refreshToken)
                  axios.defaults.headers.common.Authorization = `Bearer ${token}`
                  requests.forEach((item) => {
                    item(token)
                  })
                  return axios(error.config)
                }
                router.push('/Login')
                return error
              })
              .catch(() => {
                router.push('/Login')
              })
              .finally(() => {
                isRefreshing = false
              })
          } else {
            return new Promise((resolve) => {
              requests.push((token: String) => {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                resolve(axios(error.config))
              })
            })
          }
        }
        return Promise.reject(error)
      }
    )
  }

  public async get<T = any>(
    url: string,
    data?: T,
    config?: object
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http
        .get(url, {
          params: data,
          ...config
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => reject(error))
    })
  }

  public async post<T = any>(
    url: string,
    data?: T,
    config?: object
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http
        .post(url, data, {
          ...config
        })
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  }
}

export default Request
