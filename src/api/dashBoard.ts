import { axios } from './axios'

// eslint-disable-next-line import/prefer-default-export
export const getPopularAuthorData = () => {
  return axios.get('/dashboard/getPopularAuthorData')
}
