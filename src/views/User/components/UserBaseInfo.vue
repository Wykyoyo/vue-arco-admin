<template>
  <div class="flex justify-center items-center flex-col">
    <Form :model="state.form" class="!w-full !sm:max-w-420px" ref="refBaseInfo">
      <FormItem field="email" :rules="validatorEmail" validate-trigger="blur">
        <template #label>
          <span class="required">邮箱：</span>
        </template>
        <Input
          placeholder="请输入邮箱(例如xxx@qq.com)"
          v-model="state.form.email"
          size="large"
        >
        </Input>
      </FormItem>
      <FormItem
        field="nickName"
        :rules="validatorNickName"
        validate-trigger="blur"
      >
        <template #label>
          <span class="required">昵称：</span>
        </template>
        <Input
          placeholder="请输入昵称"
          v-model="state.form.nickName"
          size="large"
        >
        </Input>
      </FormItem>
      <FormItem field="address">
        <template #label>
          <span>地址：</span>
        </template>
        <Input
          placeholder="请输入昵称"
          v-model="state.form.address"
          size="large"
        >
        </Input>
      </FormItem>
      <FormItem field="introduction">
        <template #label>
          <span>个人简介：</span>
        </template>
        <Input
          placeholder="请输入个人简介"
          v-model="state.form.introduction"
          size="large"
        >
        </Input>
      </FormItem>
    </Form>
    <div>
      <Button type="primary" @click="onClickSave">保 存</Button>
      <Button class="ml-20px" @click="onClickReset">重 置</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Form, Input, Button } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'

const FormItem = Form.Item
const refBaseInfo = ref()

// #region 验证规则相关
const validatorEmail = [
  {
    validator: (value: string, callback: any) => {
      if ((value ?? '') === '') {
        callback('请输入邮箱')
      }
    }
  }
]
const validatorNickName = [
  {
    validator: (value: string, callback: any) => {
      if ((value ?? '') === '') {
        callback('请输入昵称')
      }
    }
  }
]
// #endregion

// #region state相关
interface IForm {
  email: string
  nickName: string
  address: string
  introduction: string
}
interface IState {
  form: IForm
}
const state = reactive<IState>({
  form: {
    email: '',
    nickName: '',
    address: '',
    introduction: ''
  }
})
// #endregion

const onClickSave = () => {
  refBaseInfo.value.validate((errors: any) => {
    if (errors === undefined) {
      // 通过验证
    }
  })
}

const onClickReset = () => {
  refBaseInfo.value.resetFields()
}
</script>
<style scoped>
.required::before {
  content: '*';
  color: #ff0000;
  vertical-align: sub;
  margin-right: 5px;
}
</style>
