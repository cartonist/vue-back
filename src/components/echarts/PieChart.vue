<template>
  <div ref="echarts" style="height: 200px"></div>
</template>

<script >
import { defineComponent, getCurrentInstance, onMounted, reactive, watch } from '@vue/runtime-core'
import * as echarts from 'echarts'
export default defineComponent({
  props: {
    pieData: Object
  },
  setup(props) {
    let pieOptions = reactive({
      tooltip: {
        trigger: 'item'
      },
      color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
      series: []
    })
    let pEcharts = null
    const { proxy } = getCurrentInstance()
    watch(
      () => props.pieData,
      () => {
        pieOptions.series = props.pieData.series
        pEcharts.setOption(pieOptions)
      }
    )

    onMounted(() => {
      pieOptions.series = props.pieData.series
      pEcharts = echarts.init(proxy.$refs.echarts)
      pEcharts.setOption(pieOptions)
    })
  }
})
</script>

<style>
</style>