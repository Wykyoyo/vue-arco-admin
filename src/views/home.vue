<template>
  <Card class="h-full">
    首页 {{ userStore.count }}

    <button @click="onClickAdd" class="bg-red-400">+1</button>
    <Button type="primary">123</Button>
    <Table></Table>
  </Card>
</template>
<script setup lang="ts">
import { Button, Table, Card } from '@arco-design/web-vue'
import useUserStore from '../store/user'

const userStore = useUserStore()

const onClickAdd = () => {
  userStore.updateCount(3)
}
</script>
