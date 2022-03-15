import Mock from 'mockjs'

const { Random } = Mock

interface IPopularAuthor {
  index: number
  name: string
  contentNumber: number
  clickNumber: number
}

const tableData: IPopularAuthor[] = []
const total = Random.natural(5, 30)

for (let i = 0; i < total; i += 1) {
  tableData.push({
    index: i + 1,
    name: Random.cword(4, 10),
    contentNumber: Random.integer(100, 20000),
    clickNumber: Random.integer(100, 20000)
  })
}

Mock.mock('/dashboard/getPopularAuthorData', 'get', () => {
  return Mock.mock({
    code: 200,
    data: {
      total,
      data: tableData
    },
    msg: ''
  })
})
