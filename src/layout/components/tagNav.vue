<template>
  <div
    class="tag h-38px flex items-center text-light-200 dark:bg-[#232324] w-full"
  >
    <div
      class="w-38px flex items-center justify-center cursor-pointer h-full"
      @click="onClickMove(100)"
    >
      <svg
        class="icon text-size-16px text-[#666666] dark:text-[#FFFFFFB3]"
        aria-hidden="true"
      >
        <use xlink:href="#icon-left"></use>
      </svg>
    </div>
    <div
      class="flex-1 overflow-hidden"
      ref="refTagsNavScroll"
      @DOMMouseScroll.prevent="onMounseScroll"
      @mousewheel.prevent="onMounseScroll"
    >
      <div
        class="scroll_menu whitespace-nowrap inline-flex items-center"
        ref="refScrollBody"
        :style="scrollNavCss"
      >
        <span
          class="tag inline-block h-24px mr-10px cursor-pointer text-[#666666] dark:text-[#FFFFFFB3] text-size-12px"
          v-for="item in menuStore.tagNavList"
          :key="item.path"
          @click="onClickTagNav(item.path)"
        >
          <div
            :class="`flex items-center h-full bg-[#F2F3F5] dark:bg-[#343435] px-10px rounded-[3px] ${
              item.path === menuStore.currentRoute.currentRoutePath
                ? 'text-[#3C7EFF]'
                : ''
            }`"
          >
            <span>{{ item.meta?.name }}</span>
            <svg
              class="icon inline-block ml-4px"
              aria-hidden="true"
              v-if="item.path !== '/home'"
              @click.stop="onCloseTagNav(item.path)"
            >
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
        </span>
      </div>
    </div>
    <div
      class="w-38px flex items-center justify-center cursor-pointer h-full"
      @click="onClickMove(-100)"
    >
      <svg
        class="icon text-size-16px text-[#666666] dark:text-[#FFFFFFB3]"
        aria-hidden="true"
      >
        <use xlink:href="#icon-right"></use>
      </svg>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useMenuStore from '../../store/menu'

const refTagsNavScroll = ref()
const refScrollBody = ref()
const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()

// #region props相关
interface IProps {
  width: number
}
const props = withDefaults(defineProps<IProps>(), {
  width: 1280
})
// #endregion

// #region state相关
interface stateModel {
  translateX: number
}
const state = reactive<stateModel>({
  translateX: 0
})
// #endregion

watch(
  () => props.width,
  () => {
    const outerWidth = refTagsNavScroll.value.offsetWidth
    const inWidth = refScrollBody.value.offsetWidth
    if (inWidth < outerWidth) {
      state.translateX = 0
    } else if (inWidth + state.translateX < outerWidth) {
      state.translateX = outerWidth - inWidth
    }
  }
)

const onClickMove = (offset: number) => {
  const outerWidth = refTagsNavScroll.value.offsetWidth
  const inWidth = refScrollBody.value.offsetWidth
  const translateXOld = state.translateX
  if (offset > 0) {
    state.translateX = Math.min(0, translateXOld + offset)
  } else if (outerWidth < inWidth) {
    if (translateXOld >= -(inWidth - outerWidth)) {
      state.translateX = Math.max(translateXOld + offset, outerWidth - inWidth)
    }
  } else {
    state.translateX = 0
  }
  return false
}

const scrollNavCss = computed(() => {
  return {
    transform: `translateX(${state.translateX}px)`
  }
})

const onMounseScroll = (value: any) => {
  const { type, wheelDelta, detail } = value
  let delta = 0
  if (type === 'DOMMouseScroll' || type === 'mousewheel') {
    delta = wheelDelta || -(detail || 0) * 40
  }
  onClickMove(delta)
}

watch(
  () => route.path,
  () => {
    menuStore.addTagNav(route)
    menuStore.updateCurrentRoutePath(
      route.path,
      (route.meta?.openKey ?? '') as string
    )
  }
)

onMounted(() => {
  menuStore.addTagNav(route)
  menuStore.updateCurrentRoutePath(
    route.path,
    (route.meta?.openKey ?? '') as string
  )
})

const onClickTagNav = (path: string) => {
  router.push(path)
}

const onCloseTagNav = (path: string) => {
  menuStore.closeTagNav(router, path)
}
</script>
<style scoped>
.scroll_menu {
  transition: transform 0.5s ease-in-out;
}
</style>
