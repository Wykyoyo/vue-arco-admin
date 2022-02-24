<template>
  <div class="flex justify-between flex-wrap">
    <Row :gutter="24">
      <Col
        v-for="item in state.cardList"
        :key="item.index"
        :span="state.cardSpan"
      >
        <Card
          class="mb-10px cursor-pointer hover:shadow-2xl dark:hover:shadow-[#000] flex-shrink-0"
          hoverable
        >
          <div class="flex h-150px px-16px py-16px">
            <img :src="item.url" class="rounded-full w-50px h-50px" />
            <div class="flex-1 ml-10px">
              <div
                class="text-size-18px font-700 py-10px tracking-wider leading-tight"
              >
                {{ item.name }}
              </div>
              <p class="describe mt-10px tracking-wider leading-tight">
                {{ item.describe }}
              </p>
            </div>
          </div>
          <div
            class="mt-10px flex border-solid border-t-1px border-[rgb(229,230,235)] dark:border-[rgb(72,74,73)] items-center"
          >
            <div class="flex-1">
              <Button class="w-full" type="text" size="large">操作一</Button>
            </div>
            <Divider direction="vertical" class="mx-0px" />
            <div class="flex-1">
              <Button type="text" class="w-full" size="large">操作二</Button>
            </div>
          </div>
        </Card>
      </Col>
    </Row>

    <!-- 补充i元素是为了调整flex最后一行的问题 -->
    <!-- <i v-for="item in 10" :key="item" class="w-380px"> </i> -->
  </div>
</template>
<script setup lang="ts">
import { Card, Button, Divider, Grid } from '@arco-design/web-vue'
import { onMounted, onUnmounted, reactive } from 'vue'
import { throttle } from 'lodash-es'
import { getCardListData } from '../../api/cardList'

const { Col, Row } = Grid
// #region state相关
interface cardListModel {
  index: number
  url: string
  name: string
  describe: string
}
interface stateModel {
  cardList: cardListModel[]
  cardSpan: number
}
const state = reactive<stateModel>({
  cardList: [],
  cardSpan: 6
})
// #endregion

const resizeWindows = throttle(() => {
  const width: number = document.documentElement.clientWidth
  if (width < 1080 && width >= 760) {
    state.cardSpan = 8
  } else if (width < 760) {
    state.cardSpan = 12
  } else {
    state.cardSpan = 6
  }
}, 500)

interface resultDataModel {
  data: cardListModel[]
}
const GetCardListData = () => {
  getCardListData().then(
    ({ code, data: result }: { code: number; data: resultDataModel }) => {
      if (code === 200) {
        state.cardList = result.data
      }
    }
  )
}

onMounted(() => {
  resizeWindows()
  window.addEventListener('resize', resizeWindows)
  GetCardListData()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeWindows)
})
</script>
<style scoped>
:deep(.arco-card-body) {
  padding: 0px;
}

.describe {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
