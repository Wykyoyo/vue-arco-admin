<template>
  <div class="login_form mt-45px">
    <Form :model="state.form" class="!w-380px" ref="refAccountLogin">
      <FormItem
        field="userName"
        hide-label
        :rules="validatorUserName"
        validate-trigger="blur"
      >
        <Input
          placeholder="请输入用户名"
          v-model="state.form.userName"
          size="large"
        >
          <template #prefix>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-user"></use>
            </svg>
          </template>
        </Input>
      </FormItem>
      <FormItem
        field="password"
        hide-label
        :rules="validatorPassword"
        validate-trigger="blur"
      >
        <Input.Password
          placeholder="请输入密码"
          v-model="state.form.password"
          size="large"
          :invisible-button="false"
        >
          <template #prefix>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-lock-fill"></use>
            </svg>
          </template>
        </Input.Password>
      </FormItem>
      <FormItem hide-label>
        <div class="flex w-full select-none">
          <a class="cursor-pointer text-size-14px" @click="changeLoginType"
            >免密码登录</a
          >
        </div>
      </FormItem>
      <FormItem field="password" hide-label>
        <Button class="w-full" type="primary" size="large" @click="onLogin">
          登录
        </Button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import { Form, Input, Button } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const FormItem = Form.Item
const refAccountLogin = ref()
const router = useRouter()

// #region 验证规则
const validatorUserName = [
  {
    validator: (value: string, callback: any) => {
      if ((value ?? '') === '') {
        callback('请输入用户名')
      }
    }
  }
]

const validatorPassword = [
  {
    validator: (value: string, callback: any) => {
      if ((value ?? '') === '') {
        callback('请输入密码')
      }
    }
  }
]

// #endregion

interface formModel {
  userName: string
  password: string
}

interface stateModel {
  form: formModel
}

const state = reactive<stateModel>({
  form: {
    userName: '',
    password: ''
  }
})

const onLogin = () => {
  refAccountLogin.value.validate((errors: any) => {
    if (errors === undefined) {
      router.push('/')
    }
  })
}

// #region  defineEmits
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (event: 'change-login-type', value: 'account' | 'sms'): void
}>()
const changeLoginType = () => {
  emit('change-login-type', 'sms')
}
// #endregion
</script>
