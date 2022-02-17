import Request from '../utils/http'

// eslint-disable-next-line import/prefer-default-export
export const axios = new Request({
  baseURL: '',
  timeout: 6000
})
