<template>
  <div>
    <Card>
      <div class="setting_top flex items-center">
        <div class="w-80px h-80px">
          <UserAvatar></UserAvatar>
        </div>
        <div class="ml-10px flex-1">
          <div v-for="item in userInfo" :key="item.key">
            <label class="w-120px inline-flex justify-end leading-30px">{{
              item.value
            }}</label>
            <span>
              {{ state.userInfo[item.key as keyof typeof state.userInfo] }}
            </span>
          </div>
        </div>
      </div>
    </Card>
    <Card class="mt-20px">
      <div>
        <Tabs
          type="rounded"
          :active-key="state.tabSelected"
          @change="onChangeTabs"
        >
          <TabPane key="base_info" title="基础信息"></TabPane>
          <TabPane key="safe_setting" title="安全设置"></TabPane>
          <!-- <TabPane key="real_name" title="实名认证"></TabPane> -->
        </Tabs>
        <div>
          <template v-if="state.tabSelected === 'base_info'">
            <UserBaseInfo></UserBaseInfo>
          </template>
          <template v-else-if="state.tabSelected === 'safe_setting'">
            <UserSafeSetting></UserSafeSetting>
          </template>
        </div>
      </div>
    </Card>
  </div>
</template>
<script lang="ts" setup>
import { Card, Tabs } from '@arco-design/web-vue'
import { reactive } from 'vue'
import UserBaseInfo from './components/UserBaseInfo.vue'
import UserSafeSetting from './components/UserSafeSetting.vue'
import UserAvatar from './components/UserAvatar.vue'

const { TabPane } = Tabs

interface IUserInfo {
  key: string
  value: string
}

const userInfo: IUserInfo[] = [
  {
    key: 'name',
    value: '用户名：'
  },
  {
    key: 'accountID',
    value: '账户ID：'
  },
  {
    key: 'registerTime',
    value: '注册时间：'
  }
]

// #region state相关
interface IState {
  userInfo: {
    name: string
    accountID: string
    registerTime: string
  }
  tabSelected: string
}
const state = reactive<IState>({
  userInfo: {
    name: '不靠谱的官方说法',
    accountID: '12312312321',
    registerTime: '2022-03-24 17:19:20'
  },
  tabSelected: 'safe_setting'
})
// #endregion

const onChangeTabs = (value: string) => {
  state.tabSelected = value
}
</script>
