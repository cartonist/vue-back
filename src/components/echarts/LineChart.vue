<template>
  <div ref="echarts" style="height: 255px"></div>
</template>

<script>
import { computed, defineComponent, getCurrentInstance, onBeforeMount, onMounted, reactive, ref, watch } from '@vue/runtime-core'
import * as echarts from 'echarts'
import { createMemoryHistory } from 'vue-router'
export default defineComponent({
  name: 'LineChart',
  props: {
    lineData: Object
  },
  setup(props) {
    const { proxy } = getCurrentInstance()
    let hEcharts = null
    const xOption = ref({
      // 图例文字颜色
      textStyle: {
        color: '#333'
      },
      legend: {
        data: []
      },
      grid: {
        // left: '20%'
      },
      // 提示框
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category', //类目轴
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
              color: '#17b3a3'
            }
          }
        }
      ],
      color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3']
    })
    watch(
      () => props.lineData,
      val => {
        xOption.value.series = props.lineData.series
        xOption.value.xAxis.data = props.lineData.xData
        xOption.value.legend.data = props.lineData.legend
        hEcharts.setOption(xOption.value)
      },
      {
        deep: true
      }
    )
    onMounted(() => {
      // proxy.$nextTick(() => {
      console.log(props.lineData, 11)
      xOption.value.series = props.lineData.series
      xOption.value.xAxis.data = props.lineData.xData
      xOption.value.legend.data = props.lineData.legend
      hEcharts = echarts.init(proxy.$refs.echarts)
      hEcharts.setOption(xOption.value)
      // })
    })
    return {
      xOption
    }
  }
})
</script>

<style>
</style>