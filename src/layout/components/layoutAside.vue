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
      <AsideMenu
        :collapsed="collapsed"
        :selected-key="menuStore.currentRoute.currentRoutePath"
        :open-key="menuStore.currentRoute.openKey"
      ></AsideMenu>
    </div>
  </div>
</template>
<script setup lang="ts">
import useMenuStore from '../../store/menu'
import AsideMenu from './asideMenu.vue'

const menuStore = useMenuStore()

// #region props相关
interface propsModel {
  collapsed: boolean
}
const props = withDefaults(defineProps<propsModel>(), {
  collapsed: false
})
// #endregion
</script>
