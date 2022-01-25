<template>
  <div
    :style="`background-image: url(${Bg})`"
    class="h-100vh flex items-center justify-center dark:bg-[#232324]"
  >
    <Card class="w-450px h-650px shadow-xl select-none">
      <div class="flex flex-col items-center">
        <div class="login_header flex justify-center items-center mt-48px">
          <img src="../../assets/svg/logo.svg" class="h-48px w-48px" />
          <span class="text-size-24px font-700 ml-14px">不靠谱的设计</span>
        </div>
        <div class="mt-20px">
          <span>西湖区最随心所欲的设计规范</span>
        </div>
        <template v-if="state.loginType === 'account'">
          <accountLogin @change-login-type="changeLoginType"></accountLogin>
        </template>
        <template v-else>
          <smsLogin @change-login-type="changeLoginType"></smsLogin>
        </template>
        <div class="login_footer select-none">
          <a class="cursor-pointer text-[#4080FF]">找回密码</a>
          <Divider direction="vertical" />
          <a class="cursor-pointer text-[#4080FF]">快速注册</a>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { Card, Divider } from '@arco-design/web-vue'
import { reactive } from 'vue'
import accountLogin from './components/accountLogin.vue'
import smsLogin from './components/smsLogin.vue'

import Bg from '../../assets/svg/bg.svg'

interface stateModel {
  loginType: 'account' | 'sms'
}

const state = reactive<stateModel>({
  loginType: 'sms'
})

const changeLoginType = (value: 'account' | 'sms') => {
  state.loginType = value
}
</script>
