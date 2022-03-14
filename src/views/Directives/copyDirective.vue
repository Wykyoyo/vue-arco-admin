<template>
  <div>
    <Card>
      <div class="flex flex-wrap">
        <Input v-model="state.copyValue" class="w-350px" />
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
