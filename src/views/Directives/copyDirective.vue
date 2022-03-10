<template>
  <div>
    <Card>
      <div class="w-350px flex">
        <Input v-model="state.copyValue" />
        <Button type="primary" v-copy-directive="state.copyValue">复制</Button>
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { Input, Button, Card } from '@arco-design/web-vue'
import { reactive } from 'vue'
import vCopyDirective from '../../directives/copy'
// #region state相关
interface IState {
  copyValue: string
}

const state = reactive<IState>({
  copyValue: ''
})
// #endregion
</script>
