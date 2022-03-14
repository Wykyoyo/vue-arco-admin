<template>
  <div class="text-[#4E5969] dark:text-[#ffffffb3]">
    <Row :gutter="20" :wrap="true">
      <Col :xs="24" :md="12" :xl="6">
        <Card
          class="dark:bg-gradient-to-b from-[#284991] to-[#122B62] border-0"
        >
          <div class="flex">
            <div class="mr-6px">
              <div class="text-size-[16px] font-700 mb-20px">访问总人数</div>
              <div class="text-size-[26px] mb-10px">5670</div>
              <div>较昨日</div>
            </div>
            <div>右边</div>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :md="12" :xl="6">
        <Card
          class="dark:bg-gradient-to-b from-[#284991] to-[#122B62] border-0"
        >
          <div class="flex">
            <div class="mr-6px">
              <div class="text-size-[16px] font-700 mb-20px">访问总人数</div>
              <div class="text-size-[26px] mb-10px">5670</div>
              <div>较昨日</div>
            </div>
            <div>右边</div>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :md="12" :xl="6">
        <Card
          class="dark:bg-gradient-to-b from-[#284991] to-[#122B62] border-0"
        >
          <div class="flex">
            <div class="mr-6px">
              <div class="text-size-[16px] font-700 mb-20px">访问总人数</div>
              <div class="text-size-[26px] mb-10px">5670</div>
              <div>较昨日</div>
            </div>
            <div>右边</div>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :md="12" :xl="6">
        <Card
          class="dark:bg-gradient-to-b from-[#284991] to-[#122B62] border-0"
        >
          <div class="flex">
            <div class="mr-6px">
              <div class="text-size-[16px] font-700 mb-20px">访问总人数</div>
              <div class="text-size-[26px] mb-10px">5670</div>
              <div>较昨日</div>
            </div>
            <div>右边</div>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :md="16" class="mt-16px">
        <Card>
          <div class="h-300px flex flex-col">
            <div>内容发布比例</div>
            <div id="content_publish_echar" class="w-full flex-1"></div>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :md="8" class="mt-16px">
        <Card>
          <div class="h-300px flex flex-col">
            <div>
              <span>热门作者榜单</span>
            </div>
            <div class="flex-1 flex flex-col overflow-hidden">
              <div class="header flex">
                <div class="mr-10px w-80px"><span>序号</span></div>
                <div class="mr-10px w-120px"><span>作者</span></div>
                <div class="mr-10px w-120px"><span>内容量</span></div>
                <div class="mr-10px w-120px"><span>点击量</span></div>
              </div>
              <div
                class="body flex-1 overflow-hidden cursor-pointer"
                ref="refAuthor"
                @mouseenter="onMouseEnter"
                @mouseleave="onMouseLeave"
              >
                <div
                  v-for="(item, index) in state.popularAuthor"
                  :key="item.name"
                >
                  <div class="body_item flex">
                    <div class="mr-10px w-80px">
                      <span>{{ index + 1 }}</span>
                    </div>
                    <div class="mr-10px w-120px">
                      <span>{{ item.name }}</span>
                    </div>
                    <div class="mr-10px w-120px">
                      <span>{{ item.contentNumber }}</span>
                    </div>
                    <div class="mr-10px w-120px">
                      <span>{{ item.clickNumber }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script lang="ts" setup>
import { Card, Grid } from '@arco-design/web-vue'
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'

// #region echars引用相关
import * as echarts from 'echarts/core'
import {
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  TooltipComponentOption
} from 'echarts/components'
import { BarChart, BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import useSettingStore from '../../store/setting'

echarts.use([GridComponent, TooltipComponent, BarChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | BarSeriesOption | TooltipComponentOption
>

// #endregion
const settingStore = useSettingStore()
const { Col, Row } = Grid
const refAuthor = ref()

// #region state相关
interface IPopularAuthor {
  name: string
  contentNumber: number
  clickNumber: number
}
interface IState {
  popularAuthor: IPopularAuthor[]
  authorInterval: any
  echars: echarts.ECharts[]
}
const state = reactive<IState>({
  popularAuthor: [
    {
      name: '张三',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三1',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三2',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三3',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三4',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三5',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三7',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三8',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三9',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三42',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三54',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三541',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三542',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三5428',
      contentNumber: 156,
      clickNumber: 246
    },
    {
      name: '张三5427',
      contentNumber: 156,
      clickNumber: 246
    }
  ],
  authorInterval: null,
  echars: []
})
// #endregion

// #region 自动滚动
const AutoScroll = () => {
  const divScroll = refAuthor.value
  state.authorInterval = setInterval(() => {
    divScroll.scrollTop += 1
    if (
      divScroll.clientHeight + divScroll.scrollTop >=
      divScroll.scrollHeight - 0.2
    ) {
      divScroll.scrollTop = 0
    }
  }, 100)
}

const onMouseEnter = () => {
  clearInterval(state.authorInterval)
}

const onMouseLeave = () => {
  AutoScroll()
}
// #endregion

// #region 内容发布比例

const initPublishContentEchar = () => {
  const chartDom = document.getElementById('content_publish_echar')
  if (chartDom) {
    const myChart = echarts.init(chartDom)
    state.echars.push(myChart)
    const option: EChartsOption = {
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            interval: 0,
            alignWithLabel: true,
            show: false
          },
          nameLocation: 'middle',
          splitNumber: 35,
          axisLine: {
            lineStyle: {
              color:
                settingStore.darkMode === 'dark'
                  ? 'rgba(15, 192, 255, 0.1)'
                  : 'rgba(15, 192, 255, 0.3)'
            }
          },
          axisLabel: {
            color: settingStore.darkMode === 'dark' ? '#fff' : '#666666' // X轴文字颜色
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color:
                settingStore.darkMode === 'dark'
                  ? 'rgba(15, 192, 255, 0.1)'
                  : 'rgba(15, 192, 255, 0.3)'
            }
          },
          axisLabel: {
            color: settingStore.darkMode === 'dark' ? '#fff' : '#666666' // X轴文字颜色
            // formatter(value) {
            //   return ConvertNumToK(value)
            // }
          }
        }
      ],
      series: [
        {
          name: 'a',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          stack: 'item',
          barWidth: '20%'
        },
        {
          name: 'b',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          stack: 'item',
          barWidth: '20%'
        }
      ],
      tooltip: [
        {
          trigger: 'axis',
          // axisPointer: {
          //   type: 'shadow'
          // },
          // formatter(params: any) {
          //   console.log(params)
          //   // let data = ''
          //   // if (params.length > 0) {
          //   //   data += `
          //   //                 <span>${params[0].name}</span>
          //   //             `
          //   //   params.forEach((item: any) => {
          //   //     if (item.value !== 0) {
          //   //       data += `
          //   //                         <div style="display: flex;justify-content: space-between;align-items: center;">
          //   //                             <div>
          //   //                                 <span style="color:${item.color}">●</span>
          //   //                                 <span>${item.seriesName}</span>
          //   //                             </div>
          //   //                             <div style="margin-left: 16px;">
          //   //                                 <span>${item.value}</span>
          //   //                             </div>
          //   //                         </div>
          //   //                     `
          //   //     }
          //   //   })
          //   // }
          //   // return data
          // },
          className: 'echarts-tooltip-diy'
          // textStyle: {
          //   color: '#FFF',
          //   fontWeight: '500'
          // }
        }
      ]
    }

    myChart.setOption(option)
    console.log(myChart.getOption())
  }
}

// #endregion

watch(
  () => settingStore.darkMode,
  () => {
    state.echars.forEach((item) => {
      const option: EChartsOption = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          top: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              interval: 0,
              alignWithLabel: true,
              show: false
            },
            nameLocation: 'middle',
            splitNumber: 35,
            axisLine: {
              lineStyle: {
                color:
                  settingStore.darkMode === 'dark'
                    ? 'rgba(15, 192, 255, 0.1)'
                    : 'rgba(15, 192, 255, 0.3)'
              }
            },
            axisLabel: {
              color: settingStore.darkMode === 'dark' ? '#fff' : '#666666' // X轴文字颜色
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color:
                  settingStore.darkMode === 'dark'
                    ? 'rgba(15, 192, 255, 0.1)'
                    : 'rgba(15, 192, 255, 0.3)'
              }
            },
            axisLabel: {
              color: settingStore.darkMode === 'dark' ? '#fff' : '#666666' // X轴文字颜色
              // formatter(value) {
              //   return ConvertNumToK(value)
              // }
            }
          }
        ],
        series: [
          {
            name: 'a',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            stack: 'item',
            barWidth: '20%'
          },
          {
            name: 'b',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            stack: 'item',
            barWidth: '20%'
          }
        ],
        tooltip: [
          {
            trigger: 'axis',
            // axisPointer: {
            //   type: 'shadow'
            // },
            // formatter(params: any) {
            //   console.log(params)
            //   // let data = ''
            //   // if (params.length > 0) {
            //   //   data += `
            //   //                 <span>${params[0].name}</span>
            //   //             `
            //   //   params.forEach((item: any) => {
            //   //     if (item.value !== 0) {
            //   //       data += `
            //   //                         <div style="display: flex;justify-content: space-between;align-items: center;">
            //   //                             <div>
            //   //                                 <span style="color:${item.color}">●</span>
            //   //                                 <span>${item.seriesName}</span>
            //   //                             </div>
            //   //                             <div style="margin-left: 16px;">
            //   //                                 <span>${item.value}</span>
            //   //                             </div>
            //   //                         </div>
            //   //                     `
            //   //     }
            //   //   })
            //   // }
            //   // return data
            // },
            className: 'echarts-tooltip-diy'
            // textStyle: {
            //   color: '#FFF',
            //   fontWeight: '500'
            // }
          }
        ]
      }
      item.setOption(option)
      console.log(item.getOption())
      // item.resize()
    })
  }
)

onMounted(() => {
  initPublishContentEchar()
  AutoScroll()
})
onUnmounted(() => {
  clearInterval(state.authorInterval)
})
</script>
<style>
.echarts-tooltip-diy {
  background: linear-gradient(
    304.17deg,
    rgba(253, 254, 255, 0.6) -6.04%,
    rgba(244, 247, 252, 0.6) 85.2%
  ) !important;
  border: none !important;
  backdrop-filter: blur(10px) !important;
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 6px !important;
  width: 150px;
}
</style>
