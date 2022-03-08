<template>
  <div>
    <Row :gutter="20" :wrap="true">
      <Col :xs="24" :md="12" :xl="6">
        <Card
          class="dark:bg-gradient-to-b from-[#284991] to-[#122B62] border-0"
        >
          <div class="flex">
            <div class="mr-6px">
              <div class="text-size-[16px] font-700 mb-20px">访问总人数</div>
              <div class="text-size-[26px] mb-10px">5670</div>
              <div>较昨日</div>
            </div>
            <div>右边</div>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :md="12" :xl="6">
        <Card
          class="dark:bg-gradient-to-b from-[#284991] to-[#122B62] border-0"
        >
          <div class="flex">
            <div class="mr-6px">
              <div class="text-size-[16px] font-700 mb-20px">访问总人数</div>
              <div class="text-size-[26px] mb-10px">5670</div>
              <div>较昨日</div>
            </div>
            <div>右边</div>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :md="12" :xl="6">
        <Card
          class="dark:bg-gradient-to-b from-[#284991] to-[#122B62] border-0"
        >
          <div class="flex">
            <div class="mr-6px">
              <div class="text-size-[16px] font-700 mb-20px">访问总人数</div>
              <div class="text-size-[26px] mb-10px">5670</div>
              <div>较昨日</div>
            </div>
            <div>右边</div>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :md="12" :xl="6">
        <Card
          class="dark:bg-gradient-to-b from-[#284991] to-[#122B62] border-0"
        >
          <div class="flex">
            <div class="mr-6px">
              <div class="text-size-[16px] font-700 mb-20px">访问总人数</div>
              <div class="text-size-[26px] mb-10px">5670</div>
              <div>较昨日</div>
            </div>
            <div>右边</div>
          </div>
        </Card>
      </Col>
    </Row>
    <div class="text-[#FFFFFF] mt-20px">
      <div>
        <span>热门作者榜单</span>
      </div>
      <div>
        <div class="header flex">
          <div class="mr-10px w-80px"><span>序号</span></div>
          <div class="mr-10px w-120px"><span>作者</span></div>
          <div class="mr-10px w-120px"><span>内容量</span></div>
          <div class="mr-10px w-120px"><span>点击量</span></div>
        </div>
        <div
          class="body h-100px overflow-hidden w-500px cursor-pointer"
          ref="refAuthor"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
        >
          <div v-for="(item, index) in state.popularAuthor" :key="item.name">
            <div class="body_item flex">
              <div class="mr-10px w-80px">
                <span>{{ index + 1 }}</span>
              </div>
              <div class="mr-10px w-120px">
                <span>{{ item.name }}</span>
              </div>
              <div class="mr-10px w-120px">
                <span>{{ item.contentNumber }}</span>
              </div>
              <div class="mr-10px w-120px">
                <span>{{ item.clickNumber }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Card, Grid } from '@arco-design/web-vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue'

const { Col, Row } = Grid
const refAuthor = ref()

// #region state相关
interface IPopularAuthor {
  name: string
  contentNumber: number
  clickNumber: number
}
interface IState {
  popularAuthor: IPopularAuthor[]
  authorInterval: any
}
const state = reactive<IState>({
  popularAuthor: [
    {
      name: '张三',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三1',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三2',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三3',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三4',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三5',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三7',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三8',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三9',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三42',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三54',
      contentNumber: 156,
      clickNumber: 246
    }
  ],
  authorInterval: null
})
// #endregion

const AutoScroll = () => {
  const divScroll = refAuthor.value
  state.authorInterval = setInterval(() => {
    divScroll.scrollTop += 1
    if (
      divScroll.clientHeight + divScroll.scrollTop >=
      divScroll.scrollHeight - 0.2
    ) {
      divScroll.scrollTop = 0
    }
  }, 100)
}

const onMouseEnter = () => {
  clearInterval(state.authorInterval)
}

const onMouseLeave = () => {
  AutoScroll()
}

onMounted(() => {
  AutoScroll()
})
onUnmounted(() => {
  clearInterval(state.authorInterval)
})
</script>
