<template>
  <div class="flex h-100vh overflow-hidden">
    <aside
      id="parentNode"
      class="z-3 shadow-sm dark:shadow-[#000000]"
      v-if="state.mobile"
    >
      <Drawer
        :visible="state.visibleDrawer"
        placement="left"
        :footer="false"
        :closable="false"
        popup-container="#parentNode"
        :width="272"
        @cancel="onCancelDrawer"
      >
        <LayoutAside :collapsed="state.collapsed"></LayoutAside>
      </Drawer>
    </aside>
    <aside id="parentNode" class="z-3 shadow-sm dark:shadow-[#000000]" v-else>
      <LayoutAside :collapsed="state.collapsed"></LayoutAside>
    </aside>
    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="z-2 shadow-sm dark:shadow-[#000000]">
        <LayoutHeader
          :collapsed="state.collapsed"
          @click-collapsed-menu="onClickCollapsedMenu"
          :online="state.online"
        ></LayoutHeader>
      </header>
      <div
        class="tag h-38px flex items-center text-light-200 dark:bg-[#232324] w-full"
      >
        <div
          class="w-38px flex items-center justify-center cursor-pointer h-full"
          @click="onClickToRight(100)"
        >
          <svg
            class="icon text-size-16px text-[#666666] dark:text-[#FFFFFFB3]"
            aria-hidden="true"
          >
            <use xlink:href="#icon-left"></use>
          </svg>
        </div>
        <div
          class="flex-1 overflow-hidden"
          ref="refTagsNavScroll"
          @DOMMouseScroll.prevent="onMounseScroll"
          @mousewheel.prevent="onMounseScroll"
        >
          <div
            class="scroll_menu whitespace-nowrap inline-block"
            ref="refScrollBody"
            :style="scrollNavCss"
          >
            <Tag class="mr-10px">首页</Tag>
            <Tag class="mr-10px">首页2</Tag>
            <Tag class="mr-10px">首页1</Tag>
            <Tag class="mr-10px">首页3</Tag>
            <Tag class="mr-10px">首页4</Tag>
            <Tag class="mr-10px">首页5</Tag>
            <Tag class="mr-10px">首页6</Tag>
            <Tag class="mr-10px">首页7</Tag>
            <Tag class="mr-10px">首页8</Tag>
            <Tag class="mr-10px">首页9asd</Tag>
            <Tag class="mr-10px">首页10sadsa</Tag>
            <Tag class="mr-10px">首页11fsadw</Tag>
            <Tag class="mr-10px">按实际龙卷风三</Tag>
            <Tag class="mr-10px">案发萨达</Tag>
            <Tag class="mr-10px">案请问发萨达</Tag>
            <Tag class="mr-10px">案请问发萨达</Tag>
            <Tag class="mr-10px">案请问发萨达</Tag>
            <Tag class="mr-10px">案请问发萨达</Tag>
            <Tag class="mr-10px">案请问发萨达</Tag>
            <Tag class="mr-10px">案请问发萨达</Tag>
            <Tag class="mr-10px">案请问发萨达</Tag>
          </div>
        </div>
        <div
          class="w-38px flex items-center justify-center cursor-pointer h-full"
          @click="onClickToRight(-100)"
        >
          <svg
            class="icon text-size-16px text-[#666666] dark:text-[#FFFFFFB3]"
            aria-hidden="true"
          >
            <use xlink:href="#icon-right"></use>
          </svg>
        </div>
      </div>
      <main class="flex-1 bg-[#F0F2F5] overflow-y-auto dark:bg-[#2A2C2C]">
        <router-view class="px-16px py-16px"></router-view>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import { throttle } from 'lodash-es'
import { io } from 'socket.io-client'
import { Tag, Button, Drawer } from '@arco-design/web-vue'
import LayoutAside from './components/layoutAside.vue'
import LayoutHeader from './components/layoutHeader.vue'

const refTagsNavScroll = ref()
const refScrollBody = ref()

// #region state相关
interface stateModel {
  collapsed: boolean
  online: number
  translateX: number
  mobile: boolean
  visibleDrawer: boolean
}
const state = reactive<stateModel>({
  collapsed: false,
  online: 0,
  translateX: 0,
  mobile: false,
  visibleDrawer: false
})
// #endregion

// #region socketio相关
// const socket = io('http://127.0.0.1:9110', {
//   transports: ['websocket']
// })
// socket.on('connect', () => {
//   console.log('连接了服务器1')
//   console.log(socket.id) // x8WIv7-mJelg7on_ALbx
// })

// socket.on('onlineUser', (data: any) => {
//   state.online = data
// })
// #endregion

const resizeWindows = throttle(() => {
  const width: number = document.documentElement.clientWidth
  if (width < 640) {
    state.mobile = true
    state.collapsed = true
  } else if (width >= 640 && width < 1024) {
    state.mobile = false
    state.collapsed = true
  } else {
    state.mobile = false
    state.collapsed = false
  }
  const outerWidth = refTagsNavScroll.value.offsetWidth
  const inWidth = refScrollBody.value.offsetWidth

  if (inWidth < outerWidth) {
    state.translateX = 0
  } else if (inWidth + state.translateX < outerWidth) {
    state.translateX = outerWidth - inWidth
  }
}, 500)

onMounted(() => {
  resizeWindows()
  window.addEventListener('resize', resizeWindows)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeWindows)
  // socket.disconnect()
})

const onClickCollapsedMenu = (value: boolean) => {
  if (state.mobile) {
    state.visibleDrawer = true
    state.collapsed = false
  } else {
    state.collapsed = value
  }
}

const onCancelDrawer = () => {
  state.visibleDrawer = false
  state.collapsed = true
}

const scrollNavCss = computed(() => {
  return {
    transform: `translateX(${state.translateX}px)`
  }
})

const onMounseScroll = (value: any) => {
  const { type, wheelDelta, detail } = value
  let delta = 0
  if (type === 'DOMMouseScroll' || type === 'mousewheel') {
    delta = wheelDelta || -(detail || 0) * 40
  }
  onClickToRight(delta)
}

const onClickToRight = (offset: number) => {
  // const divScrollM = refScrollMenu.value
  // divScrollM.scrollLeft += 100
  const outerWidth = refTagsNavScroll.value.offsetWidth
  const inWidth = refScrollBody.value.offsetWidth
  const translateXOld = state.translateX
  if (offset > 0) {
    state.translateX = Math.min(0, translateXOld + offset)
  } else if (outerWidth < inWidth) {
    if (translateXOld >= -(inWidth - outerWidth)) {
      state.translateX = Math.max(translateXOld + offset, outerWidth - inWidth)
    }
  } else {
    state.translateX = 0
  }
  return false
}
</script>
<style scoped>
.scroll_menu {
  transition: transform 0.5s ease-in-out;
}
:deep(.arco-drawer-body) {
  padding: 0px;
}
</style>
