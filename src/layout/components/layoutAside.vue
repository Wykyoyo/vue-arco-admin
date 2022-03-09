<template>
  <div
    class="h-full flex flex-col select-none dark:bg-[#232324]"
    :style="{ width: `${collapsed ? '48px' : '272px'}` }"
  >
    <div class="h-64px flex items-center justify-center select-none">
      <img src="../../assets/svg/logo.svg" class="h-42px w-42px" />
      <span
        class="ml-10px text-size-24px font-700 dark:text-[#FFFFFFB3]"
        v-if="!collapsed"
        >不靠谱的设计</span
      >
    </div>
    <div class="overflow-y-auto h-full">
      <Menu
        :collapsed="collapsed"
        :accordion="true"
        class="h-full"
        @menu-item-click="onClickMenuItem"
        :defaultSelectedKeys="['/home']"
      >
        <MenuItem key="/home" data-obj="1">
          <template #icon>
            <div class="flex items-center h-full">
              <svg class="icon h-20px w-20px" aria-hidden="true">
                <use xlink:href="#icon-dashboard"></use>
              </svg>
            </div>
          </template>
          首页
        </MenuItem>
        <SubMenu>
          <template #icon>
            <div class="flex items-center h-full">
              <svg class="icon h-20px w-20px" aria-hidden="true">
                <use xlink:href="#icon-table"></use>
              </svg>
            </div>
          </template>
          <template #title> 列表页 </template>
          <MenuItem key="/list/search-table">查询表格</MenuItem>
          <MenuItem key="/list/card-list">标准列表</MenuItem>
        </SubMenu>
        <SubMenu>
          <template #icon>
            <div class="flex items-center h-full">
              <svg class="icon h-20px w-20px" aria-hidden="true">
                <use xlink:href="#icon-edit-square"></use>
              </svg>
            </div>
          </template>
          <template #title> 博客 </template>
          <MenuItem key="/blog/md-editor-v3">发表博客</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Menu } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

const MenuItem = Menu.Item
const { SubMenu } = Menu
const router = useRouter()

// #region props相关
interface propsModel {
  collapsed: boolean
}
const props = withDefaults(defineProps<propsModel>(), {
  collapsed: false
})
// #endregion

const onClickMenuItem = (key: string) => {
  router.push(key)
}
</script>
