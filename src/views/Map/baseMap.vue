<template>
  <div id="bmap" class="w-full h-full"></div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import useSettingStore from '../../store/setting'
import { initMapScript, darkMap } from '../../utils/baidu_map'

const settingStore = useSettingStore()

// #region state相关
interface stateModel {
  map: any
}
const state = reactive<stateModel>({
  map: null
})
// #endregion

watch(
  () => {
    return { darkMode: settingStore.darkMode, map: state.map }
  },
  () => {
    if (settingStore.darkMode === 'dark') {
      state.map.setMapStyleV2({ styleJson: darkMap })
    } else {
      state.map.setMapStyleV2({ styleJson: [] })
    }
  }
)

onMounted(() => {
  initMapScript().then((BMapGL: any) => {
    const map = new BMapGL.Map('bmap') // 创建Map实例
    map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 12) // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    state.map = map
  })
})
</script>
