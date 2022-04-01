import Request from '../utils/http'

export const axios = new Request({
  baseURL:
    'https://www.fastmock.site/mock/c2a5bcf67d768ed1c9e70df74b24d5b1/api',
  timeout: 6000
})

export const axiosNest = new Request({
  baseURL: '/api',
  timeout: 6000
})
