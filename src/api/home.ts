import { axios } from './axios'

// eslint-disable-next-line import/prefer-default-export
export const mapData = () => {
  return axios.get(
    'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
  )
}
