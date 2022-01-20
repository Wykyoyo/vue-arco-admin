<template>
  <div>
    首页 {{ userStore.count }}
    <button @click="onClickAdd">+1</button>
  </div>
</template>
<script setup lang="ts">
import useUserStore from '../store/user'

const userStore = useUserStore()
const onClickAdd = () => {
  userStore.updateCount(3)
}
</script>
