<template>
  <div class="w-full h-full px-0 py-0 flex items-center justify-center">
    <!-- <div class="absolute flex z-2 px-10px py-10px">
      <div
        class="cursor-pointer text-size-18px font-700 text-[#000918] dark:text-[#666666]"
        v-for="(item, index) in state.enterMap"
        :key="item.adcode"
        @click="onClickGoMap(item.adcode)"
      >
        {{ item.name }}
        <span class="mx-4px" v-if="index !== state.enterMap.length - 1">
          >>
        </span>
      </div>
    </div> -->
    <div id="map_echar" class="w-full h-full"></div>
  </div>
</template>
<script setup lang="ts">
// 备注:因为伪3D地图下钻性能很差,故放弃采用现有方案。若想实现可参照https://juejin.cn/post/6994606112775340039
import {
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  shallowReactive
} from 'vue'
// eslint-disable-next-line import/order
import { getGeoJson } from '../utils/utils'

// #region echars引用相关
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  VisualMapComponent,
  GridComponent
} from 'echarts/components'
import {
  MapChart,
  MapSeriesOption,
  EffectScatterChart,
  EffectScatterSeriesOption
} from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { IMapData } from '../types/home'
import { getMapData } from '../api/home'

echarts.use([
  MapChart,
  EffectScatterChart,
  CanvasRenderer,
  TooltipComponent,
  VisualMapComponent,
  GridComponent
])

type EChartsOption = echarts.ComposeOption<
  MapSeriesOption | EffectScatterSeriesOption
>
// #endregion

// #region state相关
interface IEnterMap {
  name: string
  adcode: number
}
interface stateModel {
  geoJson: any
  mapData: IMapData[]
  enterMap: IEnterMap[]
}
const state = reactive<stateModel>({
  geoJson: null,
  mapData: [],
  enterMap: [
    {
      name: '全国',
      adcode: 100000
    }
  ]
})
interface IShallowState {
  echarts: echarts.ECharts[]
}
const shallowState = shallowReactive<IShallowState>({
  echarts: []
})
// #endregion

const initMapEchar = (
  mapData: any,
  pointData: any,
  min: number,
  max: number
) => {
  const mapEcharDom = document.getElementById('map_echar')
  if (mapEcharDom) {
    const mapEchar = echarts.init(mapEcharDom)
    shallowState.echarts.push(mapEchar)
    echarts.registerMap('map', state.geoJson)
    const mapName = 'map'
    const options: EChartsOption = {
      grid: {
        left: '0%',
        top: '0%',
        right: '0%',
        bottom: '0%'
      },
      tooltip: {
        trigger: 'item',
        formatter: (p: any) => {
          const content = `
                        <div class="map_tooltip">
                            <div class="map_tooltip_content_item">
                                <span class="content_item_point" style="color:#1AFFBF;">●</span>
                                <span class="content_item_name">正常数据</span>
                                <span class="content_item_value">${p.data.count?.normalNumber}</span>
                            </div>
                            <div class="map_tooltip_content_item">
                                <span class="content_item_point" style="color:#FF6132;">●</span>
                                <span class="content_item_name">缺陷数据</span>
                                <span class="content_item_value">${p.data.count?.abnormalNumber}</span>
                            </div>
                        </div>
                    `
          return content
        },
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        borderColor: 'rgba(0, 0, 0, 0.65)'
      },
      geo: {
        map: mapName,
        zoom: 1.1,
        roam: true,
        label: {
          normal: {
            show: true,
            color: '#ffffff', // 省份标签字体颜色
            formatter: (p: any) => {
              switch (p.name) {
                case '内蒙古自治区':
                  // eslint-disable-next-line no-param-reassign
                  p.name = '内蒙古'
                  break
                case '西藏自治区':
                  // eslint-disable-next-line no-param-reassign
                  p.name = '西藏'
                  break
                case '新疆维吾尔自治区':
                  // eslint-disable-next-line no-param-reassign
                  p.name = '新疆'
                  break
                case '宁夏回族自治区':
                  // eslint-disable-next-line no-param-reassign
                  p.name = '宁夏'
                  break
                case '广西壮族自治区':
                  // eslint-disable-next-line no-param-reassign
                  p.name = '广西'
                  break
                case '香港特别行政区':
                  // eslint-disable-next-line no-param-reassign
                  p.name = '香港'
                  break
                case '澳门特别行政区':
                  // eslint-disable-next-line no-param-reassign
                  p.name = '澳门'
                  break
                default:
                  break
              }
              return p.name
            }
          },
          emphasis: {
            show: true,
            color: '#ffffff'
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#24CFF4',
            borderColor: '#53D9FF',
            borderWidth: 1.3,
            shadowBlur: 15,
            shadowColor: 'rgb(58,115,192)',
            shadowOffsetX: 7,
            shadowOffsetY: 6
          },
          emphasis: {
            areaColor: '#8dd7fc',
            borderWidth: 1.6,
            shadowBlur: 25
          }
        }
      },
      visualMap: {
        min,
        max,
        left: '1%',
        bottom: '10%',
        calculable: true,
        seriesIndex: [0],
        inRange: {
          color: ['#24CFF4', '#2E98CA', '#1E62AC']
        },
        textStyle: {
          color: '#24CFF4'
        }
      },
      series: [
        {
          name: '地图',
          type: 'map',
          geoIndex: 0,
          map: mapName,
          roam: true, // 是否可缩放
          zoom: 1.3, // 缩放比例
          selectedMode: false, // 不让单独选中
          data: mapData
        },
        {
          name: '散点',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          rippleEffect: {
            brushType: 'fill'
          },
          itemStyle: {
            color(params: any) {
              const value = params.value[2]

              if (value > 0) {
                return '#FF9700'
              }
              return '#1AFFBF'
            },
            shadowBlur: 10,
            shadowColor: '#333'
          },
          data: pointData,
          symbolSize() {
            return 10
          },
          showEffectOn: 'render' // 加载完毕显示特效
        }
      ]
    }
    mapEchar.setOption(options, true)
    mapEchar.off('click')
    mapEchar.on('click', onClickEchartMap)
  }
}

// 点击下钻
const onClickEchartMap = (params: any) => {
  if (state.enterMap.length < 3) {
    const { data } = params
    const index = state.enterMap.findIndex(
      (item) => item.adcode === data.adcode
    )
    if (index === -1) {
      state.enterMap.push({
        name: data.name,
        adcode: data.adcode
      })
      GetGeoJson(data.adcode)
    }
  }
}

// 点击返回某一级
const onClickGoMap = (adcode: number) => {
  const index = state.enterMap.findIndex((item) => item.adcode === adcode)
  state.enterMap.length = index + 1
  GetGeoJson(adcode)
}

interface IRequest {
  code: number
  data: {
    mapData: IMapData[]
  }
  message: string
}

const GetGeoJson = (adcode: number) => {
  getGeoJson(adcode).then((res: any) => {
    const mockData: IMapData[] = res.features.map((item: any) => {
      return {
        name: item.properties.name,
        adcode: item.properties.adcode,
        center: item.properties.center,
        normalNumber: 0,
        abnormalNumber: 0
      }
    })
    getMapData(mockData)
      .then((resMap: any) => {
        const { code, data } = resMap as IRequest
        if (code === 200) {
          const { mapData } = data
          state.mapData = mapData
        }
        state.geoJson = res
        ComputeMapData()
      })
      .catch(() => {
        state.geoJson = res
        ComputeMapData()
      })
  })
}

const ComputeMapData = () => {
  let min = 0
  let max = 1
  const mapData: any = []
  const pointData: any = []
  state.mapData.forEach((item, index) => {
    const value = item.normalNumber + item.abnormalNumber
    if (index === 0) {
      min = value
      max = value
    }
    if (value < min) {
      min = value
    } else if (value > max) {
      max = value
    }
    mapData.push({
      name: item.name,
      value,
      adcode: item.adcode,
      count: {
        normalNumber: item.normalNumber,
        abnormalNumber: item.abnormalNumber
      }
    })
    if (item.center) {
      pointData.push({
        name: item.name,
        value: [item.center[0], item.center[1], item.normalNumber],
        adcode: item.adcode
      })
    }
  })
  initMapEchar(mapData, pointData, min, max)
}

onMounted(() => {
  nextTick(() => {
    GetGeoJson(100000)
  })
})
onUnmounted(() => {
  shallowState.echarts.forEach((item) => {
    item.dispose()
  })
})
</script>
<style>
.map_tooltip {
  color: #fff;
}
.map_tooltip_content_item {
  display: flex;
  align-items: center;
}
.content_item_name {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin-right: 8px;
  margin-left: 4px;
}
.content_item_value {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
}
</style>
