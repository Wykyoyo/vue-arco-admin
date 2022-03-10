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
        class="scroll_menu whitespace-nowrap inline-block"
        ref="refScrollBody"
        :style="scrollNavCss"
      >
        <Tag class="mr-10px">首页</Tag>
        <Tag class="mr-10px">首页2</Tag>
        <Tag class="mr-10px">首页1</Tag>
        <Tag class="mr-10px">首页3</Tag>
        <Tag class="mr-10px">首页4</Tag>
        <Tag class="mr-10px">首页5</Tag>
        <Tag class="mr-10px">首页6</Tag>
        <Tag class="mr-10px">首页7</Tag>
        <Tag class="mr-10px">首页8</Tag>
        <Tag class="mr-10px">首页9asd</Tag>
        <Tag class="mr-10px">首页10sadsa</Tag>
        <Tag class="mr-10px">首页11fsadw</Tag>
        <Tag class="mr-10px">按实际龙卷风三</Tag>
        <Tag class="mr-10px">案发萨达</Tag>
        <Tag class="mr-10px">案请问发萨达</Tag>
        <Tag class="mr-10px">案请问发萨达</Tag>
        <Tag class="mr-10px">案请问发萨达</Tag>
        <Tag class="mr-10px">案请问发萨达</Tag>
        <Tag class="mr-10px">案请问发萨达</Tag>
        <Tag class="mr-10px">案请问发萨达</Tag>
        <Tag class="mr-10px">案请问发萨达</Tag>
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
import { Tag } from '@arco-design/web-vue'
import { computed, reactive, ref, watch } from 'vue'

const refTagsNavScroll = ref()
const refScrollBody = ref()

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
</script>
<style scoped>
.scroll_menu {
  transition: transform 0.5s ease-in-out;
}
</style>
