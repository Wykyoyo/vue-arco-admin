<template>
  <div class="h-full px-0 py-0 bg-[#100C2A]">
    <div id="map" class="w-600px h-600px"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { mapData } from '../api/home'
import useUserStore from '../store/user'

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
])

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>

const initPie = () => {
  const chartDom = document.getElementById('map')!
  const myChart = echarts.init(chartDom, 'light')

  const option: EChartsOption = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  // eslint-disable-next-line no-unused-expressions
  option && myChart.setOption(option)
}

const userStore = useUserStore()

const onClickAdd = () => {
  userStore.updateCount(3)
}

// const GetMapData = () => {
//   mapData().then((res) => {
//     console.log(res)
//   })
// }
onMounted(() => {
  initPie()
})
</script>
