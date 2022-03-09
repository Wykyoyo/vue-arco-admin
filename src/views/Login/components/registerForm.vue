<template>
  <div class="mt-25px">
    <template v-if="currentStep === 1">
      <Form
        :model="state.formSms"
        class="!w-full !sm:max-w-380px"
        ref="refFormSms"
      >
        <FormItem
          field="mobile"
          hide-label
          :rules="validatorMobile"
          validate-trigger="blur"
        >
          <Input
            placeholder="请输入手机号"
            v-model="state.formSms.mobile"
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
            v-model="state.formSms.smscode"
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
          >
            {{ state.getSms.text }}
          </Button>
        </FormItem>
        <FormItem hide-label>
          <Button
            class="w-full"
            type="primary"
            size="large"
            @click="onClickNext"
          >
            下一步
          </Button>
        </FormItem>
      </Form>
    </template>
    <template v-else-if="currentStep === 2">
      <Form
        :model="state.formAccount"
        class="!w-full !sm:max-w-380px"
        ref="refFormAccount"
      >
        <FormItem field="username" hide-label>
          <Input
            placeholder="请输入用户名"
            v-model="state.formAccount.username"
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
          <Password
            placeholder="请输入密码"
            v-model="state.formAccount.password"
            size="large"
          >
            <template #prefix>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-lock-fill"></use>
              </svg>
            </template>
          </Password>
        </FormItem>
        <FormItem
          field="confirmPassword"
          hide-label
          :rules="validatorConfirmPassword"
          validate-trigger="blur"
        >
          <Password
            placeholder="请再次确认密码"
            v-model="state.formAccount.confirmPassword"
            size="large"
          >
            <template #prefix>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-lock-fill"></use>
              </svg>
            </template>
          </Password>
        </FormItem>
        <FormItem hide-label>
          <Button
            class="w-full"
            type="primary"
            size="large"
            @click="onClickRegister"
          >
            快速注册
          </Button>
        </FormItem>
      </Form>
    </template>
    <template v-else>
      <Result status="success">
        <template #subtitle>
          <div>注册成功!</div>
          <div>
            {{ state.jumpLoginTime }}s后自动跳转到
            <a class="text-[#3C7EFF] cursor-pointer" @click="onClickLogin">
              登录页
            </a>
          </div>
        </template>
      </Result>
    </template>
  </div>
</template>
<script setup lang="ts">
import { Form, Input, Button, Result } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const FormItem = Form.Item
const { Password } = Input
const refFormSms = ref()
const refFormAccount = ref()
const regPassword =
  /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/

// #region state相关
interface IFormSms {
  mobile: string
  smscode: string
}

interface IFormAccount {
  username: string
  password: string
  confirmPassword: string
}

interface IGetSms {
  text: string
  disabled: boolean
}

interface IState {
  formSms: IFormSms
  getSms: IGetSms
  formAccount: IFormAccount
  jumpLoginTime: number
}
const state = reactive<IState>({
  formSms: {
    mobile: '',
    smscode: ''
  },
  getSms: {
    text: '获取验证码',
    disabled: false
  },
  formAccount: {
    username: '',
    password: '',
    confirmPassword: ''
  },
  jumpLoginTime: 5
})
// #endregion

// #region props相关
interface IProps {
  currentStep: number
}
const props = withDefaults(defineProps<IProps>(), {
  currentStep: 1
})
// #endregion

// #region emits相关
const emit = defineEmits<{
  (e: 'click-next', value: number): void
}>()
// #endregion

// 获取验证码
const onGetSmsCode = () => {
  refFormSms.value.validateField('mobile', (errors: any) => {
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

// 下一步
const onClickNext = () => {
  refFormSms.value.validate((errors: any) => {
    if (errors === undefined) {
      emit('click-next', 2)
    }
  })
}

// 快速注册
const onClickRegister = () => {
  refFormAccount.value.validate((errors: any) => {
    if (errors === undefined) {
      emit('click-next', 3)
      const jumpInterval = setInterval(() => {
        state.jumpLoginTime -= 1
        if (state.jumpLoginTime <= 0) {
          clearInterval(jumpInterval)
          router.push('/login')
        }
      }, 1000)
    }
  })
}

const onClickLogin = () => {
  router.push('/login')
}

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
        state.formAccount.confirmPassword &&
        state.formAccount.confirmPassword !== value
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
      } else if (
        state.formAccount.password &&
        state.formAccount.password !== value
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
// #endregion
</script>
