<template>
  <div>
    <div class="flex items-center mb-20px">
      <span class="pb-5px">登录密码：</span>
      <div
        class="flex-1 flex justify-between items-center border-b-1 border-solid border-[#666666] pb-5px"
      >
        <span :class="`${state.password === '' ? 'text-[#666666]' : ''}`">
          {{
            state.password === ''
              ? '请设置登录密码,用于登录系统'
              : state.password
          }}
        </span>
        <Button type="text">修改</Button>
      </div>
    </div>
    <div class="flex items-center mb-20px">
      <span class="pb-5px">安全手机：</span>
      <div
        class="flex-1 flex justify-between items-center border-b-1 border-solid border-[#666666] pb-5px"
      >
        <span :class="`${state.mobile === '' ? 'text-[#666666]' : ''}`">
          {{
            state.mobile === ''
              ? '您暂未设置手机，绑定手机可以用来找回密码、接收通知等'
              : state.mobile
          }}
        </span>
        <Button type="text">修改</Button>
      </div>
    </div>
    <div class="flex items-center mb-20px">
      <span class="pb-5px">安全邮箱：</span>
      <div
        class="flex-1 flex justify-between items-center border-b-1 border-solid border-[#666666] pb-5px"
      >
        <span :class="`${state.email === '' ? 'text-[#666666]' : ''}`">
          {{
            state.email === ''
              ? '您暂未设置邮箱，绑定邮箱可以用来找回密码、接收通知等'
              : state.email
          }}
        </span>
        <Button type="text">修改</Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@arco-design/web-vue'
import { reactive } from 'vue'

// #region state相关
interface IState {
  password: string
  mobile: string
  email: string
}
const state = reactive<IState>({
  password: '',
  mobile: '157****3808',
  email: ''
})
// #endregion
</script>
