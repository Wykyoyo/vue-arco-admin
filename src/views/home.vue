<template>
  <div class="h-full px-0 py-0">
    <div id="map_echar" class="w-full h-full"></div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive } from 'vue'
// eslint-disable-next-line import/order
import { getGeoJson } from '../utils/utils'
// #region echars引用相关
import * as echarts from 'echarts/core'
// import { GridComponent, GridComponentOption } from 'echarts/components'
// import { BarChart, BarSeriesOption } from 'echarts/charts'
import { MapChart, MapSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([MapChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<MapSeriesOption>
// #endregion

// #region state相关
interface stateModel {
  geoJson: any
}
const state = reactive<stateModel>({
  geoJson: null
})
// #endregion

const initMapEchar = () => {
  const mapEcharDom = document.getElementById('map_echar')
  if (mapEcharDom) {
    const mapEchar = echarts.init(mapEcharDom)
    echarts.registerMap('map', state.geoJson)
    const mapName = 'map'
    const options: EChartsOption = {
      geo: {
        map: mapName, // 地图类型。
        zoom: 1,
        roam: true,
        animation: false,
        itemStyle: {
          // 区域样式
          areaColor: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(147, 235, 248, 1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(2, 99, 206, 1)' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          },
          shadowColor: '#105781', // 地图区域的阴影颜色。
          shadowOffsetX: 0,
          shadowOffsetY: 10
        }
      },
      series: [
        {
          name: 'map',
          type: 'map', // 地图
          map: mapName, // 加载注册的地图
          selectedMode: false, // 不让单独选中
          roam: true, // 开始鼠标事件，scale缩放、move移动
          // 图形上的文本标签
          label: {
            show: true,
            color: '#000a3c'
          },
          // 地图样式
          itemStyle: {
            // 区域样式
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 3,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(223, 231, 242, 1)' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(2, 99, 206, 1)' // 100% 处的颜色
                }
              ]
              // globalCoord: false // 缺省为 false
            },
            borderWidth: 1, // 边框大小
            borderColor: 'rgba(104, 152, 190, 1)', // 边框样式
            shadowColor: 'rgba(128, 217, 248, 1)', // 阴影颜色
            shadowOffsetX: -2, // 阴影水平方向上的偏移距离
            shadowOffsetY: 2, // 阴影垂直方向上的偏移距离
            shadowBlur: 10 // 文字块的背景阴影长度
          },
          // 选中状态下样式
          emphasis: {
            label: {
              color: '#ffffff'
            },
            itemStyle: {
              areaColor: '#a5d4fe'
            }
          }
        }
      ]
    }

    mapEchar.setOption(options)
    mapEchar.on('georoam', (params: any) => {
      const option: any = mapEchar.getOption() // 获得option对象
      if (params.zoom != null && params.zoom !== undefined) {
        // 捕捉到缩放时
        option.geo[0].zoom = option.series[0].zoom // 下层geo的缩放等级跟着上层的geo一起改变
        option.geo[0].center = option.series[0].center // 下层的geo的中心位置随着上层geo一起改变
      } else {
        // 捕捉到拖曳时
        option.geo[0].center = option.series[0].center // 下层的geo的中心位置随着上层geo一起改变
      }
      mapEchar.setOption(option) // 设置option
    })
  }
}

const GetGeoJson = () => {
  getGeoJson(100000).then((res: any) => {
    state.geoJson = res
    initMapEchar()
  })
}

onMounted(() => {
  nextTick(() => {
    GetGeoJson()
  })
})
</script>
