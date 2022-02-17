import { axios } from './axios'

export const getSearchTable = (data: any) => {
  return axios.get('/list/GetSearchTable', data)
}

export const handleLittleThings = (data: any) => {
  return axios.post('/api/v1/littleThings/HandleLittleThings_PC', data)
}
