import { axios } from './axios'

// eslint-disable-next-line import/prefer-default-export
export const getCardListData = () => {
  return axios.get('/list/GetCardListData')
}
