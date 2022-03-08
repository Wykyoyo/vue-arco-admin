<template>
  <div
    :style="`background-image: url(${Bg})`"
    class="h-100vh flex items-center justify-center dark:bg-[#232324]"
  >
    <Card class="w-450px h-650px shadow-xl select-none">
      <div class="flex flex-col items-center">
        <div class="mt-24px text-size-24px font-600">
          <span>注册用户</span>
        </div>
        <div class="mt-45px">
          <Steps :current="state.currentStep" type="arrow" :small="true">
            <Step><span class="w-55px block">1</span></Step>
            <Step><span class="w-55px block">2</span></Step>
            <Step><span class="w-55px block">3</span></Step>
          </Steps>
        </div>
        <RegisterForm
          :current-step="state.currentStep"
          @click-next="onClickNext"
        ></RegisterForm>
        <div class="login_footer select-none">
          <a class="cursor-pointer text-[#4080FF]" @click="onClickLogin">
            登录
          </a>
          <Divider direction="vertical" />
          <a class="cursor-pointer text-[#4080FF]" @click="onClickForgot">
            忘记密码
          </a>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { Card, Divider, Steps } from '@arco-design/web-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Bg from '../../assets/svg/bg.svg'
import RegisterForm from './components/registerForm.vue'

const { Step } = Steps
const router = useRouter()

// #region state相关
interface IState {
  currentStep: number
}
const state = reactive<IState>({
  currentStep: 1
})
// #endregion

// 下一步
const onClickNext = (value: number) => {
  state.currentStep = value
}

// 跳转到登录
const onClickLogin = () => {
  router.push('/login')
}

// 跳转到注册
const onClickForgot = () => {
  router.push('/forgot')
}
</script>
