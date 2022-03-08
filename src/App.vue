<template>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <div class="min-h-100vh">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import useSettingStore from './store/setting'

const settingStore = useSettingStore()

onMounted(() => {
  const mode = settingStore.darkMode
  document.documentElement.classList.remove(mode === 'dark' ? 'light' : 'dark')
  document.documentElement.classList.add(mode)

  document.body.setAttribute('arco-theme', mode)
})
</script>
