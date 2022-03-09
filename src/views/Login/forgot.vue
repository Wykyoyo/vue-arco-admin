<template>
  <div
    :style="`background-image: url(${Bg})`"
    class="min-h-100vh flex items-center justify-center dark:bg-[#232324]"
  >
    <Card
      class="w-450px h-650px select-none bg-[#00000000] border-0px sm:bg-[var(--color-bg-2)] sm:border-1px sm:shadow-xl"
    >
      <div class="flex flex-col items-center">
        <div class="mt-24px text-size-24px font-600">
          <span>忘记密码</span>
        </div>
        <div class="mt-45px">
          <Form
            :model="state.form"
            class="!w-full !sm:max-w-380px"
            ref="refForgot"
          >
            <FormItem
              field="mobile"
              hide-label
              :rules="validatorMobile"
              validate-trigger="blur"
            >
              <Input
                placeholder="请输入手机号"
                v-model="state.form.mobile"
                size="large"
              >
                <template #prefix>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mobile"></use>
                  </svg>
                </template>
              </Input>
            </FormItem>
            <FormItem
              field="smscode"
              hide-label
              :rules="validatorSmscode"
              validate-trigger="blur"
            >
              <Input
                placeholder="请输入验证码"
                v-model="state.form.smscode"
                size="large"
                :invisible-button="false"
              >
                <template #prefix>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-safetycertificate-f"></use>
                  </svg>
                </template>
              </Input>
              <Button
                size="large"
                type="outline"
                class="w-250px ml-10px"
                :disabled="state.getSms.disabled"
                @click="onGetSmsCode"
                >{{ state.getSms.text }}</Button
              >
            </FormItem>
            <FormItem
              field="password"
              hide-label
              :rules="validatorPassword"
              validate-trigger="blur"
            >
              <Input
                placeholder="请输入密码"
                v-model="state.form.password"
                size="large"
              >
                <template #prefix>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-lock-fill"></use>
                  </svg>
                </template>
              </Input>
            </FormItem>
            <FormItem
              field="confirmPassword"
              hide-label
              :rules="validatorConfirmPassword"
              validate-trigger="blur"
            >
              <Input
                placeholder="请再次确认密码"
                v-model="state.form.confirmPassword"
                size="large"
              >
                <template #prefix>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-lock-fill"></use>
                  </svg>
                </template>
              </Input>
            </FormItem>
            <FormItem field="password" hide-label>
              <Button
                class="w-full"
                type="primary"
                size="large"
                @click="onForgotPassword"
              >
                找回密码
              </Button>
            </FormItem>
          </Form>
        </div>
        <div class="login_footer select-none">
          <a class="cursor-pointer text-[#4080FF]" @click="onClickLogin">
            登录
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
import { Card, Divider, Form, Input, Button } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import Bg from '../../assets/svg/bg.svg'

const refForgot = ref()
const FormItem = Form.Item
const regPassword =
  /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/

const router = useRouter()

// #region 验证规则
const validatorMobile = [
  {
    validator: (value: string, callback: any) => {
      if ((value ?? '') === '') {
        callback('请输入手机号')
      }
    }
  }
]
const validatorSmscode = [
  {
    validator: (value: string, callback: any) => {
      if ((value ?? '') === '') {
        callback('请输入验证码')
      }
    }
  }
]
const validatorPassword = [
  {
    validator: (value: string, callback: any) => {
      if ((value ?? '') === '') {
        callback('请输入密码')
      } else if (
        state.form.confirmPassword &&
        state.form.confirmPassword !== value
      ) {
        callback('密码跟确认密码不一致')
      } else if (!regPassword.test(value)) {
        callback('“大写字母，小写字母，数字，特殊字符”四项中的至少三项')
      } else if (value.length < 8) {
        callback('密码长度最少8位')
      }
    }
  }
]
const validatorConfirmPassword = [
  {
    validator: (value: string, callback: any) => {
      if ((value ?? '') === '') {
        callback('请再次确认密码')
      } else if (state.form.password && state.form.password !== value) {
        callback('密码跟确认密码不一致')
      } else if (!regPassword.test(value)) {
        callback('“大写字母，小写字母，数字，特殊字符”四项中的至少三项')
      } else if (value.length < 8) {
        callback('密码长度最少8位')
      }
    }
  }
]
// #endregion

// #region state相关
interface formModel {
  mobile: string
  smscode: string
  password: string
  confirmPassword: string
}

interface getSmsModel {
  text: string
  disabled: boolean
}

interface stateModel {
  form: formModel
  getSms: getSmsModel
}

const state = reactive<stateModel>({
  form: {
    mobile: '',
    smscode: '',
    password: '',
    confirmPassword: ''
  },
  getSms: {
    text: '获取验证码',
    disabled: false
  }
})
// #endregion

// 获取验证码
const onGetSmsCode = () => {
  refForgot.value.validateField('mobile', (errors: any) => {
    if (errors === undefined) {
      state.getSms.disabled = true
      let time = 60
      state.getSms.text = `${time} 秒后重新获取`
      const setinterval = setInterval(() => {
        time -= 1
        if (time <= 0) {
          clearInterval(setinterval)
          state.getSms.disabled = false
          state.getSms.text = '重新获取验证码'
        } else {
          state.getSms.text = `${time} 秒后重新获取`
        }
      }, 1000)
    }
  })
}

// 找回密码
const onForgotPassword = () => {
  refForgot.value.validate((errors: any) => {
    if (errors === undefined) {
      router.push('/login')
    }
  })
}

// 跳转到登录
const onClickLogin = () => {
  router.push('/login')
}

// 跳转到注册
const onClickRegister = () => {
  router.push('/register')
}
</script>
