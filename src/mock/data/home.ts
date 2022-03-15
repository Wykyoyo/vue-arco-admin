import Mock from 'mockjs'
import { IMapData } from '../../types/home'

const { Random } = Mock

Mock.mock('/home/GetMapData', 'get', (data: IMapData[]) => {
  const mapData = data.map((item: IMapData, index: number) => {
    if (index % 3 === 0) {
      return {
        adcode: item.adcode,
        normalNumber: 0,
        abnormalNumber: 0
      }
    }
    return {
      adcode: item.adcode,
      normalNumber: Random.integer(100, 2000),
      abnormalNumber: Random.integer(100, 2000)
    }
  })
  return Mock.mock({
    code: 200,
    data: {
      data: mapData
    },
    msg: ''
  })
})
