<template>
  <div class="flex h-100vh overflow-hidden">
    <aside id="parentNode" class="z-3 shadow-sm dark:shadow-[#000000]">
      <LayoutAside
        :collapsed="state.collapsed"
        v-if="state.equipment !== 'mobile' && !drawerVisible"
      ></LayoutAside>
      <div
        v-else-if="state.equipment !== 'mobile'"
        class="w-48px h-full dark:bg-[#232324]"
      ></div>
      <Drawer
        :visible="drawerVisible"
        placement="left"
        :footer="false"
        :closable="false"
        popup-container="#parentNode"
        :width="272"
        @cancel="onCancelDrawer"
      >
        <LayoutAside :collapsed="false"></LayoutAside>
      </Drawer>
    </aside>
    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="z-2 shadow-sm dark:shadow-[#000000]">
        <LayoutHeader
          :collapsed="state.collapsed"
          @click-collapsed-menu="onClickCollapsedMenu"
          :online="state.online"
        ></LayoutHeader>
      </header>
      <TagNav :width="state.width"></TagNav>
      <main class="flex-1 bg-[#F0F2F5] overflow-y-auto dark:bg-[#2A2C2C]">
        <router-view class="px-16px py-16px"></router-view>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue'
import { throttle } from 'lodash-es'
import { io } from 'socket.io-client'
import { Drawer } from '@arco-design/web-vue'
import { useRoute } from 'vue-router'
import LayoutAside from './components/layoutAside.vue'
import LayoutHeader from './components/layoutHeader.vue'
import TagNav from './components/tagNav.vue'
import useMenuStore from '../store/menu'

// #region state相关
interface stateModel {
  collapsed: boolean
  online: number
  mobile: boolean
  visibleDrawer: boolean
  width: number
  equipment: string
}
const state = reactive<stateModel>({
  collapsed: false,
  online: 0,
  mobile: false,
  visibleDrawer: false,
  width: 1280,
  equipment: 'pc'
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
  state.width = width
  if (width < 640) {
    state.equipment = 'mobile'
    state.collapsed = true
  } else if (width >= 640 && width < 1024) {
    state.equipment = 'tablet'
    state.collapsed = true
  } else {
    state.equipment = 'pc'
    state.collapsed = false
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
  state.collapsed = true
}

const drawerVisible = computed(() => {
  if (
    (state.equipment === 'mobile' || state.equipment === 'tablet') &&
    state.collapsed === false
  ) {
    return true
  }
  return false
})

const route = useRoute()
const menuStore = useMenuStore()
watch(
  () => {
    return route.path
  },
  () => {
    menuStore.addTagNav(route)
    menuStore.updateCurrentRoutePath(
      route.path,
      (route.meta?.openKey ?? '') as string
    )
  }
)
</script>
<style scoped>
:deep(.arco-drawer-body) {
  padding: 0px;
}
</style>
