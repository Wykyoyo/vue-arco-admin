<template>
  <div class="h-64px flex justify-between items-center dark:bg-[#232324]">
    <div class="header_left ml-24px">
      <template v-if="collapsed">
        <svg
          class="icon text-size-24px cursor-pointer dark:text-[#FFFFFFB3]"
          aria-hidden="true"
          @click="onClickCollapsedMenu(false)"
        >
          <use xlink:href="#icon-indent"></use>
        </svg>
      </template>
      <template v-else>
        <svg
          class="icon text-size-24px cursor-pointer dark:text-[#FFFFFFB3]"
          aria-hidden="true"
          @click="onClickCollapsedMenu(true)"
        >
          <use xlink:href="#icon-outdent"></use>
        </svg>
      </template>
    </div>
    <div class="header_right mr-14px h-full flex items-center">
      <div
        class="cursor-pointer h-full px-10px hover:bg-[#F5F5F5] flex items-center select-none dark:hover:bg-[#3D3D3E] dark:text-[#FFFFFFB3]"
      >
        当前在线人数 <span>{{ online }} </span>人
      </div>
      <Popover
        position="br"
        trigger="click"
        content-class="layout_header_notice_popover"
      >
        <div
          class="cursor-pointer h-full px-10px hover:bg-[#F5F5F5] flex items-center select-none dark:hover:bg-[#3D3D3E]"
        >
          <Badge
            :count="noticeNumber"
            :dot-style="{ top: '-3px', right: '-1px' }"
          >
            <svg
              class="icon text-size-20px dark:text-[#FFFFFFB3]"
              aria-hidden="true"
            >
              <use xlink:href="#icon-bell"></use>
            </svg>
          </Badge>
        </div>
        <template #content>
          <NoticeContent
            :active-key="state.notice.activeKey"
            :notice-list="state.notice.noticeList"
            @change-tab="onChangeTab"
          ></NoticeContent>
        </template>
      </Popover>
      <DarkMode></DarkMode>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Badge, Popover } from '@arco-design/web-vue'
import { computed, reactive } from 'vue'
import NoticeContent from './noticeContent.vue'
import DarkMode from './darkMode.vue'
import UserInfo from './userInfo.vue'

// #region props相关
interface propsModel {
  collapsed: boolean
  online: number
}
const props = withDefaults(defineProps<propsModel>(), {
  collapsed: false,
  online: 0
})
// #endregion

// #region state相关
interface noticeBaseModel {
  key: 'message' | 'notice' | 'todo'
  number: number
  data: any
}
interface noticeListModel {
  message: noticeBaseModel
  notice: noticeBaseModel
  todo: noticeBaseModel
}

interface noticeModel {
  show: boolean
  activeKey: string
  noticeList: noticeListModel
}
interface stateModel {
  notice: noticeModel
}

const state = reactive<stateModel>({
  notice: {
    show: true,
    activeKey: 'message',
    noticeList: {
      message: {
        key: 'message',
        number: 3,
        data: []
      },
      notice: {
        key: 'notice',
        number: 8,
        data: []
      },
      todo: {
        key: 'todo',
        number: 6,
        data: []
      }
    }
  }
})
// #endregion

const onClickCollapsedMenu = (value: boolean) => {
  emit('click-collapsed-menu', value)
}

// #region emits相关
const emit = defineEmits<{
  (e: 'click-collapsed-menu', value: boolean): void
}>()
// #endregion

// #region 消息通知相关
const noticeNumber = computed(() => {
  return (
    state.notice.noticeList.message.number +
    state.notice.noticeList.notice.number +
    state.notice.noticeList.todo.number
  )
})
const onChangeTab = (value: 'message' | 'notice' | 'todo') => {
  state.notice.activeKey = value
}
// #endregion
</script>
<style>
.layout_header_notice_popover {
  padding: 0px;
}
</style>
