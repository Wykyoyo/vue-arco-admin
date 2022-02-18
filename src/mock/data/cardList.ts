import Mock from 'mockjs'

const { Random } = Mock

interface CardListModel {
  index: number
  url: string
  name: string
  describe: string
}

const tableData: CardListModel[] = []
const total = Random.natural(3, 15)

for (let i = 0; i < total; i += 1) {
  tableData.push({
    index: i + 1,
    url: Random.image('200x200', undefined, Random.cword(1, 1)),
    name: Random.cword(4, 10),
    describe: Random.cword(100, 200)
  })
}

Mock.mock('/list/GetCardListData', 'get', () => {
  return Mock.mock({
    code: 200,
    data: {
      total,
      data: tableData
    },
    msg: ''
  })
})
