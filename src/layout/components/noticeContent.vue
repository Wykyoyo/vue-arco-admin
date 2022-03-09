<template>
  <div class="w-full">
    <Tabs :active-key="activeKey" @change="onChangeTab">
      <TabPane
        v-for="item in tabList"
        :key="item.key"
        :title="`${item.title}${
          noticeList[item.key as keyof typeof props.noticeList].number !== 0
            ? '（' + noticeList[item.key as keyof typeof props.noticeList].number + '）'
            : ''
        }`"
      ></TabPane>
    </Tabs>
    <div class="min-h-100px max-h-460px overflow-y-auto px-16px"></div>
    <div
      class="flex items-center border-solid border-t-1px border-[rgb(229,230,235)] dark:border-[rgb(72,74,73)]"
    >
      <Button class="flex-1" type="text" size="large"
        >清空 {{ clearText }}</Button
      >
      <Divider direction="vertical" class="m-0px"></Divider>
      <Button class="flex-1" type="text" size="large">查看更多</Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Tabs, Divider, Button } from '@arco-design/web-vue'
import { computed } from 'vue'

const { TabPane } = Tabs

interface tabListModel {
  key: string
  title: string
}
const tabList: tabListModel[] = [
  {
    key: 'message',
    title: '消息'
  },
  {
    key: 'notice',
    title: '通知'
  },
  {
    key: 'todo',
    title: '待办'
  }
]

const clearText = computed(() => {
  const index = tabList.findIndex((item) => item.key === props.activeKey)
  return index === -1 ? '' : tabList[index].title
})

// #region props相关
interface noticeBaseModel {
  key: 'message' | 'notice' | 'todo'
  number: number
  data: any
}
interface noticeModel {
  message: noticeBaseModel
  notice: noticeBaseModel
  todo: noticeBaseModel
}
interface propsModel {
  activeKey: string
  noticeList: noticeModel
}
const props = withDefaults(defineProps<propsModel>(), {
  activeKey: 'message',
  noticeList: () => {
    return {
      message: {
        key: 'message',
        number: 1,
        data: []
      },
      notice: {
        key: 'notice',
        number: 0,
        data: []
      },
      todo: {
        key: 'todo',
        number: 0,
        data: []
      }
    }
  }
})
// #endregion

const emit = defineEmits<{
  (e: 'change-tab', value: 'message' | 'notice' | 'todo'): void
}>()
// 切换标签页
const onChangeTab = (key: 'message' | 'notice' | 'todo') => {
  emit('change-tab', key)
}
</script>
<style scoped>
:deep(.arco-tabs-nav-tab) {
  justify-content: center;
}
:deep(.arco-tabs-tab) {
  padding: 8px 16px;
}
</style>
