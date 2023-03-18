<template>
  <div ref="echarts" style="height: 210px"></div>
</template>

<script>
import { defineComponent, getCurrentInstance, onBeforeMount, onMounted, reactive, watch } from '@vue/runtime-core'
import * as echarts from 'echarts'
export default defineComponent({
  name: 'BarChart',
  props: {
    barData: Object
  },
  setup(props) {
    let hEcharts = null
    const { proxy } = getCurrentInstance()
    let xOption2 = reactive({
      legend: {
        // 图例文字颜色
        textStyle: {
          color: '#333'
        }
      },
      grid: {
        left: '10%'
      },
      // 提示框
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category', // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: '#17b3a3'
          }
        },
        axisLabel: {
          interval: 0,
          color: '#333'
        }
      },
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '17b3a3'
            }
          }
        }
      ],
      color: ['#2ec7c9', '#b6a2de']
    })
    watch(
      () => props.barData,
      val => {
        xOption2.xAxis.data = props.barData.xData
        xOption2.series = props.barData.series
        hEcharts.setOption(xOption2)
      },
      {
        deep: true
      }
    )
    onMounted(() => {
      hEcharts = echarts.init(proxy.$refs.echarts)
      hEcharts.setOption(xOption2)
    })
  }
})
</script>

<style>
</style>