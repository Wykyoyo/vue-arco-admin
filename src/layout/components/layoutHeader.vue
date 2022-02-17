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
        class="cursor-pointer h-full px-10px hover:bg-[#F5F5F5] flex items-center select-none dark:hover:bg-[#3D3D3E]"
        @click="onChangeDarkMode"
      >
        <svg
          class="icon text-size-20px dark:text-[#FFFFFFB3]"
          aria-hidden="true"
          v-if="state.mode === 'light'"
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
      <div
        class="cursor-pointer h-full px-10px hover:bg-[#F5F5F5] flex items-center select-none dark:hover:bg-[#3D3D3E]"
      >
        <Avatar class="flex-shrink-0">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-user"></use>
          </svg>
        </Avatar>
        <span class="ml-6px dark:text-[#FFFFFFB3]">不靠谱的官方说法</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Avatar } from '@arco-design/web-vue'
import { onMounted, reactive } from 'vue'
// #region props相关
interface propsModel {
  collapsed: boolean
}
const props = withDefaults(defineProps<propsModel>(), {
  collapsed: false
})
// #endregion

// #region state相关
interface stateModel {
  mode: 'light' | 'dark'
}

const state = reactive<stateModel>({
  mode: 'dark'
})
// #endregion

const onClickCollapsedMenu = (value: boolean) => {
  emit('click-collapsed-menu', value)
}

// 切换暗黑模式
const onChangeDarkMode = () => {
  const mode = state.mode === 'dark' ? 'light' : 'dark'
  document.documentElement.classList.remove(mode === 'dark' ? 'light' : 'dark')
  document.documentElement.classList.add(mode)

  document.body.setAttribute('arco-theme', mode)
  state.mode = mode
}

// #region emits相关
const emit = defineEmits<{
  (e: 'click-collapsed-menu', value: boolean): void
}>()
// #endregion

onMounted(() => {
  const { mode } = state
  document.documentElement.classList.remove(mode === 'dark' ? 'light' : 'dark')
  document.documentElement.classList.add(mode)

  document.body.setAttribute('arco-theme', mode)
})
</script>
