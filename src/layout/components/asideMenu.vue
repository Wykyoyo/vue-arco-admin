<template>
  <Menu
    :collapsed="collapsed"
    class="h-full"
    :selected-keys="[selectedKey]"
    :auto-open-selected="true"
    @menu-item-click="onClickMenuItem"
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
    <SubMenu key="/dashboard">
      <template #icon>
        <div class="flex items-center h-full">
          <svg class="icon h-20px w-20px" aria-hidden="true">
            <use xlink:href="#icon-Report"></use>
          </svg>
        </div>
      </template>
      <template #title> 大屏可视化 </template>
      <MenuItem key="/dashboard/analysis">数据分析</MenuItem>
    </SubMenu>
    <SubMenu key="/list">
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
    <SubMenu key="/blog">
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
    <SubMenu key="/directive">
      <template #icon>
        <div class="flex items-center h-full">
          <svg class="icon h-20px w-20px" aria-hidden="true">
            <use xlink:href="#icon-icon_Order"></use>
          </svg>
        </div>
      </template>
      <template #title> 指令 </template>
      <MenuItem key="/directive/copy-directive">复制指令</MenuItem>
    </SubMenu>
    <SubMenu key="/exception">
      <template #icon>
        <div class="flex items-center h-full">
          <svg class="icon h-20px w-20px" aria-hidden="true">
            <use xlink:href="#icon-warn1"></use>
          </svg>
        </div>
      </template>
      <template #title> 异常页 </template>
      <MenuItem key="/exception/403">403</MenuItem>
      <MenuItem key="/exception/404">404</MenuItem>
      <MenuItem key="/exception/500">500</MenuItem>
    </SubMenu>
  </Menu>
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
  selectedKey: string
  openKey: string
}
const props = withDefaults(defineProps<propsModel>(), {
  collapsed: false,
  selectedKey: '/home',
  openKey: '/home'
})
// #endregion

const onClickMenuItem = (key: string) => {
  router.push(key)
}
</script>
