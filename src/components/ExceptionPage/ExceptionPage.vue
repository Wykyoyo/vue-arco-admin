<template>
  <div class="text-[#666666] text-center flex-col mt-40px">
    <img :src="src" class="inline-block" />
    <div class="text-size-32px mt-32px">{{ code }}</div>
    <div class="text-size-18px mt-18px">{{ describe }}</div>
    <Button type="primary" class="mt-16px">返回首页</Button>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@arco-design/web-vue'
// #region props相关
interface IProps {
  src: string
  code: number
  describe: string
}
const props = withDefaults(defineProps<IProps>(), {
  src: '../../assets/svg/404.svg',
  code: 404,
  describe: '抱歉，您访问的页面不存在'
})
// #endregion
</script>
