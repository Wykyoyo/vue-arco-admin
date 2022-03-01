<template>
  <div class="flex h-100vh overflow-hidden">
    <aside class="z-3 shadow-sm dark:shadow-[#000000]">
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
      <main class="flex-1 bg-[#F0F2F5] overflow-y-auto dark:bg-[#2A2C2C]">
        <router-view class="px-16px py-16px"></router-view>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue'
import { throttle } from 'lodash-es'
import { io } from 'socket.io-client'
import LayoutAside from './components/layoutAside.vue'
import LayoutHeader from './components/layoutHeader.vue'

// #region state相关
interface stateModel {
  collapsed: boolean
  online: number
}
const state = reactive<stateModel>({
  collapsed: false,
  online: 0
})
// #endregion

// #region socketio相关
const socket = io('http://127.0.0.1:9110', {
  transports: ['websocket']
})
// socket.on('connect', () => {
//   console.log('连接了服务器1')
//   console.log(socket.id) // x8WIv7-mJelg7on_ALbx
// })

socket.on('onlineUser', (data: any) => {
  state.online = data
})
// #endregion

const resizeWindows = throttle(() => {
  const width: number = document.documentElement.clientWidth
  if (width < 990) {
    state.collapsed = true
  } else {
    state.collapsed = false
  }
}, 500)

onMounted(() => {
  resizeWindows()
  window.addEventListener('resize', resizeWindows)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeWindows)
  socket.disconnect()
})

const onClickCollapsedMenu = (value: boolean) => {
  state.collapsed = value
}
</script>
