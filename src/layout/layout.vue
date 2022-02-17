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
        ></LayoutHeader>
      </header>
      <main
        class="flex-1 bg-[#F0F2F5] overflow-y-auto dark:bg-[#2A2C2C] px-16px py-16px"
      >
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import LayoutAside from './components/layoutAside.vue'
import LayoutHeader from './components/layoutHeader.vue'

// #region state相关
interface stateModel {
  collapsed: boolean
}
const state = reactive<stateModel>({
  collapsed: false
})
// #endregion

const onClickCollapsedMenu = (value: boolean) => {
  state.collapsed = value
}
</script>
