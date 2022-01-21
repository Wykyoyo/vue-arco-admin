import axios from './axios'

export const RefreshToken = () => {
  return axios.get('/RefreshToken')
}

export const Login = (data: any) => {
  return axios.post('/Login', data)
}
