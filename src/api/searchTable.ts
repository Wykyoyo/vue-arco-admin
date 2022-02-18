import { axios } from './axios'

// eslint-disable-next-line import/prefer-default-export
export const getSearchTable = (data: any) => {
  return axios.get('/list/GetSearchTable', data)
}
