<template>
  <div
    :style="`background-image: url(${Bg})`"
    class="min-h-100vh flex items-center justify-center dark:bg-[#232324]"
  >
    <Card
      class="w-450px h-650px select-none bg-[#00000000] border-0px sm:bg-[var(--color-bg-2)] sm:border-1px sm:shadow-xl"
    >
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
          <a class="cursor-pointer text-[#4080FF]" @click="onClickForgot">
            找回密码
          </a>
          <Divider direction="vertical" />
          <a class="cursor-pointer text-[#4080FF]" @click="onClickRegister">
            快速注册
          </a>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { Card, Divider } from '@arco-design/web-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import accountLogin from './components/accountLogin.vue'
import smsLogin from './components/smsLogin.vue'

import Bg from '../../assets/svg/bg.svg'

const router = useRouter()

// #region state相关
interface stateModel {
  loginType: 'account' | 'sms'
}

const state = reactive<stateModel>({
  loginType: 'account'
})
// #endregion

const changeLoginType = (value: 'account' | 'sms') => {
  state.loginType = value
}

// 找回密码
const onClickForgot = () => {
  router.push('/forgot')
}
// 快捷注册
const onClickRegister = () => {
  router.push('/register')
}
</script>
