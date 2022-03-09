<template>
  <div class="login_form mt-45px w-full flex justify-center">
    <Form :model="state.form" class="!w-full !sm:max-w-380px" ref="refSmsLogin">
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
      <FormItem hide-label>
        <div class="flex w-full select-none">
          <a class="cursor-pointer text-size-14px" @click="changeLoginType"
            >密码登录</a
          >
        </div>
      </FormItem>
      <FormItem field="password" hide-label>
        <Button class="w-full" type="primary" size="large" @click="onLogin"
          >登录</Button
        >
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import { Form, Input, Button } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const refSmsLogin = ref()
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
// #endregion

// 获取验证码
const onGetSmsCode = () => {
  refSmsLogin.value.validateField('mobile', (errors: any) => {
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

const onLogin = () => {
  refSmsLogin.value.validate((errors: any) => {
    if (errors === undefined) {
      router.push('/')
    }
  })
}

// #region defineEmits
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (event: 'change-login-type', value: 'account' | 'sms'): void
}>()
const changeLoginType = () => {
  emit('change-login-type', 'account')
}
// #endregion
</script>
