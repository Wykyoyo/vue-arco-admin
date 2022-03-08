<template>
  <div>
    <Card class="search_info">
      <Space wrap>
        <p>
          <span class="w-60px inline-block">规则名称</span>
          <Input
            placeholder="请输入规则名称"
            class="w-250px ml-6px"
            v-model="state.search.name"
          />
        </p>
        <p>
          <span class="w-60px inline-block">描述</span>
          <Input
            placeholder="请输入规则名称"
            class="w-250px ml-6px"
            v-model="state.search.describe"
          />
        </p>
        <Button type="primary">查询</Button>
      </Space>
    </Card>
    <Card class="mt-10px">
      <div class="flex justify-between items-center mb-10px">
        <div>
          <Button type="primary">新增</Button>
        </div>
        <div>
          <svg
            class="icon text-size-24px cursor-pointer"
            aria-hidden="true"
            @click="onShowColumnSet"
          >
            <use xlink:href="#icon-setting"></use>
          </svg>
        </div>
      </div>
      <Table
        :data="state.table.tableData"
        :bordered="{ wrapper: true, cell: true }"
        :pagination="false"
        :scroll="{ y: state.table.tableHeight }"
      >
        <template #columns>
          <template v-for="item in state.table.tableColumns">
            <template v-if="item.dataIndex === 'action' && item.show === true">
              <TableColumn
                :title="item.title"
                :key="item.dataIndex"
                :width="item.width"
                :fixed="item.fixed"
              >
                <template #cell>
                  <Button type="primary" size="mini">编辑</Button>
                </template>
              </TableColumn>
            </template>
            <template v-else-if="item.show === true">
              <TableColumn
                :title="item.title"
                :data-index="item.dataIndex"
                :key="item.dataIndex"
                :width="item.width"
                :fixed="item.fixed"
              ></TableColumn>
            </template>
          </template>
        </template>
      </Table>
    </Card>
    <Modal
      :visible="state.columnSet.show"
      :footer="false"
      :closable="false"
      :align-center="false"
      :width="750"
      modal-class="search_table_column_set"
    >
      <template #title>
        <div class="w-full flex items-center justify-between">
          <span>列设置</span>
          <div>
            <Button shape="round" class="mr-[10px]" @click="onCancelColumnSet"
              >取消</Button
            >
            <Button type="primary" shape="round" @click="onConfirmColumnSet"
              >保存</Button
            >
          </div>
        </div>
      </template>
      <div
        class="column_set_modal overflow-y-auto"
        :style="{ maxHeight: state.table + 'px' }"
      >
        <List :bordered="false" class="mt-0" size="small">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-[18px]"><strong>固定在左侧</strong></span>
              <Button type="text">重置</Button>
            </div>
          </template>
          <draggable
            class="list-group"
            itemKey="dataIndex"
            :list="state.columnSet.columnLeft"
            v-bind="dragOptions"
            group="table_column"
          >
            <template #item="{ element }">
              <ListItem>
                <div class="flex items-center cursor-move px-20px py-9px">
                  <Checkbox class="mr-10px" v-model="element.show"></Checkbox>
                  <span class="flex-1 overflow-hidden w-0">
                    <span
                      class="block bg-[#F1F1F1] whitespace-nowrap dark:bg-[#555556]"
                      :style="`width:${element.width}px`"
                    >
                      <span>{{ element.title }}</span>
                    </span>
                  </span>
                  <div class="flex items-center justify-between w-150px">
                    <span class="flex-shrink-0">宽度</span>
                    <InputNumber
                      v-model="element.width"
                      size="small"
                    ></InputNumber>
                    <span>px</span>
                  </div>
                </div>
              </ListItem>
            </template>
          </draggable>
        </List>

        <List :bordered="false" class="mt-0" size="small">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-[18px]"><strong>不固定</strong></span>
            </div>
          </template>
          <draggable
            itemKey="dataIndex"
            :list="state.columnSet.columnCenter"
            v-bind="dragOptions"
            group="table_column"
          >
            <template #item="{ element }">
              <ListItem>
                <div class="flex items-center cursor-move px-20px py-9px">
                  <Checkbox class="mr-10px" v-model="element.show"></Checkbox>
                  <span class="flex-1 overflow-hidden w-0">
                    <span
                      class="block bg-[#F1F1F1] whitespace-nowrap dark:bg-[#555556]"
                      :style="`width:${element.width}px`"
                    >
                      <span>{{ element.title }}</span>
                    </span>
                  </span>
                  <div class="flex items-center justify-between w-150px">
                    <span class="flex-shrink-0">宽度</span>
                    <InputNumber
                      v-model="element.width"
                      size="small"
                    ></InputNumber>
                    <span>px</span>
                  </div>
                </div>
              </ListItem>
            </template>
          </draggable>
        </List>
        <List :bordered="false" class="mt-0 mb-40px" size="small">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-[18px]"><strong>不固定</strong></span>
            </div>
          </template>
          <draggable
            itemKey="dataIndex"
            :list="state.columnSet.columnRight"
            v-bind="dragOptions"
            group="table_column"
          >
            <template #item="{ element }">
              <ListItem>
                <div class="flex items-center cursor-move px-20px py-9px">
                  <Checkbox class="mr-10px" v-model="element.show"></Checkbox>
                  <span class="flex-1 overflow-hidden w-0">
                    <span
                      class="block bg-[#F1F1F1] whitespace-nowrap dark:bg-[#555556]"
                      :style="`width:${element.width}px`"
                    >
                      <span>{{ element.title }}</span>
                    </span>
                  </span>
                  <div class="flex items-center justify-between w-150px">
                    <span class="flex-shrink-0">宽度</span>
                    <InputNumber
                      v-model="element.width"
                      size="small"
                    ></InputNumber>
                    <span>px</span>
                  </div>
                </div>
              </ListItem>
            </template>
          </draggable>
        </List>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import {
  Card,
  Input,
  Space,
  Button,
  Table,
  Modal,
  List,
  Checkbox,
  InputNumber
} from '@arco-design/web-vue'
import { computed, onMounted, reactive } from 'vue'
import draggable from 'vuedraggable'
import { getSearchTable } from '../../api/searchTable'

const TableColumn = Table.Column
const ListItem = List.Item

// #region state相关
interface searchModel {
  name: string
  describe: string
}
interface tableDataModel {
  name: string
  describe: string
  number: number
  status: number
  time: string
}
interface tableColumnsModel {
  show: boolean
  dataIndex: string
  title: string
  width?: number
  fixed?: 'left' | 'right'
}

interface tableModel {
  tableHeight: number
  page: number
  pageSize: number
  tableData: tableDataModel[]
  tableColumns: tableColumnsModel[]
}
interface columnSetModel {
  show: boolean
  columnLeft: tableColumnsModel[]
  columnCenter: tableColumnsModel[]
  columnRight: tableColumnsModel[]
}
interface stateModel {
  search: searchModel
  table: tableModel
  columnSet: columnSetModel
}
const state = reactive<stateModel>({
  search: {
    name: '',
    describe: ''
  },
  table: {
    tableHeight: document.documentElement.clientHeight - 350,
    page: 1,
    pageSize: 10,
    tableData: [],
    tableColumns: [
      {
        show: true,
        dataIndex: 'index',
        title: '序号',
        width: 80,
        fixed: 'left'
      },
      {
        show: true,
        dataIndex: 'name',
        title: '规则名称',
        width: 180
      },
      {
        show: true,
        dataIndex: 'describe',
        title: '描述',
        width: 1800
      },
      {
        show: true,
        dataIndex: 'number',
        title: '服务调用次数',
        width: 180
      },
      {
        show: true,
        dataIndex: 'status',
        title: '状态',
        width: 180
      },
      {
        show: true,
        dataIndex: 'time',
        title: '上次调用时间',
        width: 180
      },
      {
        show: true,
        dataIndex: 'action',
        title: '操作',
        width: 120,
        fixed: 'right'
      }
    ]
  },
  columnSet: {
    show: false,
    columnLeft: [],
    columnCenter: [],
    columnRight: []
  }
})
// #endregion

interface resultDataModel {
  total: number
  data: tableDataModel[]
}
const GetSearchTableData = () => {
  const data = {}
  getSearchTable(data).then(
    ({ code, data: result }: { code: number; data: resultDataModel }) => {
      if (code === 200) {
        state.table.tableData = result.data
      }
    }
  )
}

// #region 自定义列相关
const onShowColumnSet = () => {
  const tableColumns: tableColumnsModel[] = JSON.parse(
    JSON.stringify(state.table.tableColumns)
  )
  state.columnSet.columnLeft = tableColumns.filter((item) => {
    return item.fixed === 'left'
  })
  state.columnSet.columnCenter = tableColumns.filter((item) => {
    return item.fixed === undefined
  })
  state.columnSet.columnRight = tableColumns.filter((item) => {
    return item.fixed === 'right'
  })
  state.columnSet.show = true
}

// 取消设置
const onCancelColumnSet = () => {
  state.columnSet.show = false
}

// 保存设置
const onConfirmColumnSet = () => {
  state.table.tableColumns = [
    ...state.columnSet.columnLeft.map((item) => {
      return { ...item, fixed: 'left' } as tableColumnsModel
    }),
    ...state.columnSet.columnCenter.map((item) => {
      return { ...item, fixed: undefined } as tableColumnsModel
    }),
    ...state.columnSet.columnRight.map((item) => {
      return { ...item, fixed: 'right' } as tableColumnsModel
    })
  ]
  state.columnSet.show = false
}

const dragOptions = computed(() => {
  return {
    animation: 0,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost'
  }
})
// #endregion

onMounted(() => {
  GetSearchTableData()
})
</script>
