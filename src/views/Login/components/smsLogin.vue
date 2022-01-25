<template>
  <div class="login_form mt-45px">
    <Form :model="state.form" class="w-380px">
      <FormItem field="userName" hide-label>
        <Input
          placeholder="请输入手机号"
          v-model="state.form.userName"
          size="large"
        >
          <template #prefix>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mobile"></use>
            </svg>
          </template>
        </Input>
      </FormItem>
      <FormItem field="password" hide-label>
        <Input
          placeholder="请输入验证码"
          v-model="state.form.password"
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
      <FormItem hide-label>
        <div class="flex w-full select-none">
          <a class="cursor-pointer text-size-14px" @click="changeLoginType"
            >密码登录</a
          >
        </div>
      </FormItem>
      <FormItem field="password" hide-label>
        <Button class="w-full" type="primary" size="large">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import { Form, Input, Button } from '@arco-design/web-vue'

import { reactive } from 'vue'

const FormItem = Form.Item

interface formModel {
  mobile: string
  smscode: string
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
    smscode: ''
  },
  getSms: {
    text: '获取验证码',
    disabled: false
  }
})

const onGetSmsCode = () => {
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

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (event: 'change-login-type', value: 'account' | 'sms'): void
}>()
const changeLoginType = () => {
  emit('change-login-type', 'account')
}
</script>
