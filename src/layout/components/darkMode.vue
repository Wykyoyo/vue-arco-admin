<template>
  <div
    class="cursor-pointer h-full px-10px hover:bg-[#F5F5F5] flex items-center select-none dark:hover:bg-[#3D3D3E]"
    @click="onChangeDarkMode"
  >
    <svg
      class="icon text-size-20px dark:text-[#FFFFFFB3]"
      aria-hidden="true"
      v-if="settingStore.darkMode === 'light'"
    >
      <use xlink:href="#icon-sun"></use>
    </svg>
    <svg
      class="icon text-size-20px dark:text-[#FFFFFFB3]"
      aria-hidden="true"
      v-else
    >
      <use xlink:href="#icon-moon"></use>
    </svg>
  </div>
</template>
<script setup lang="ts">
import useSettingStore from '../../store/setting'

const settingStore = useSettingStore()

// 切换暗黑模式
const onChangeDarkMode = () => {
  const mode = settingStore.darkMode === 'dark' ? 'light' : 'dark'
  document.documentElement.classList.remove(mode === 'dark' ? 'light' : 'dark')
  document.documentElement.classList.add(mode)

  document.body.setAttribute('arco-theme', mode)
  settingStore.updateDarkMode(mode)
}
</script>
