<template>
  <div class="text-red-500 dark:text-yellow-800">
    首页 {{ userStore.count }}
    <span
      v-if="state.mode === 'light'"
      @click="changeDarkMode('dark')"
      class="text-size-22px"
    >
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sun"></use>
      </svg>
    </span>
    <span v-else @click="changeDarkMode('light')" class="text-size-22px">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-moon"></use>
      </svg>
    </span>

    <button @click="onClickAdd" class="bg-red-400">+1</button>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import useUserStore from '../store/user'

const userStore = useUserStore()

interface stateModel {
  mode: 'light' | 'dark'
}

const state = reactive<stateModel>({
  mode: 'light'
})

// 切换暗黑模式
const changeDarkMode = (mode: 'light' | 'dark') => {
  document.body.setAttribute('class', mode)
  state.mode = mode
}
const onClickAdd = () => {
  userStore.updateCount(3)
}
</script>
