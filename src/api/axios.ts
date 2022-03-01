import Request from '../utils/http'

export const axios = new Request({
  baseURL: '',
  timeout: 6000
})

export const axiosNest = new Request({
  baseURL: '/api',
  timeout: 6000
})
