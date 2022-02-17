import Mock from 'mockjs'

const { Random } = Mock

interface GetSearchTableModel {
  index: number
  name: string
  describe: string
  number: number
  status: number
  time: string
}

const tableData: GetSearchTableModel[] = []
const total = Random.natural(10, 100)

for (let i = 0; i < total; i += 1) {
  tableData.push({
    index: i + 1,
    name: Random.cword(4, 10),
    describe: Random.cword(10, 50),
    number: Random.integer(100, 300),
    status: Random.integer(0, 4),
    time: Random.date('yyyy-MM-dd')
  })
}

Mock.mock('/list/GetSearchTable', 'get', () => {
  return Mock.mock({
    code: 200,
    data: {
      total,
      data: tableData
    },
    msg: ''
  })
})
