import { axios, axiosNest } from './axios'

export const RefreshToken = () => {
  return axios.get('/RefreshToken')
}

export const Login = (data: any) => {
  return axios.post('/Login', data)
}

export const loginNest = (data: any) => {
  return axiosNest.post('/auth/login', data)
}
