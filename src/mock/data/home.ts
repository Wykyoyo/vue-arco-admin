import Mock from 'mockjs'
import { IMapData } from '../../types/home'

const { Random } = Mock

Mock.mock('/home/getMapData', 'post', ({ body }: { body: string }) => {
  const data: IMapData[] = JSON.parse(body)
  const mapData = data.map((item: IMapData, index: number) => {
    if (index % 3 === 0) {
      return {
        name: item.name,
        adcode: item.adcode,
        center: item.center,
        normalNumber: 0,
        abnormalNumber: 0
      }
    }
    return {
      name: item.name,
      adcode: item.adcode,
      center: item.center,
      normalNumber: Random.integer(100, 2000),
      abnormalNumber: Random.integer(100, 2000)
    }
  })
  return Mock.mock({
    code: 200,
    data: {
      mapData
    },
    msg: ''
  })
})
