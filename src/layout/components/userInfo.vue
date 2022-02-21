<template>
  <Dropdown @select="onSelect">
    <div
      class="cursor-pointer h-full px-10px hover:bg-[#F5F5F5] flex items-center select-none dark:hover:bg-[#3D3D3E]"
    >
      <Avatar class="flex-shrink-0">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-user"></use>
        </svg>
      </Avatar>
      <span class="ml-6px dark:text-[#FFFFFFB3]">不靠谱的官方说法</span>
    </div>
    <template #content>
      <Option value="logout">
        <div class="flex items-center w-160px">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-logout"></use>
          </svg>
          <span class="ml-6px">退出登录</span>
        </div>
      </Option>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import { Dropdown, Avatar } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

const { Option } = Dropdown
const router = useRouter()
// #region 用户名下拉菜单相关
const onSelect = (value: String) => {
  switch (value) {
    case 'logout':
      router.push('/login')
      break

    default:
      break
  }
}
// #endregion
</script>
