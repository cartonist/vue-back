<template>
  <el-row class="home" :gutter="15">
    <el-col :span="8" style="marign-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="getImgSrc(`${userInfo.img}.webp`)" alt="">
          <div class="user-info">
            <p class="name">{{ userInfo.name }}</p>
            <p class="role">{{ userInfo.access }}</p>
          </div>
        </div>
        <div class="user-login">
          <p>上次登录时间<span>2022-11-25</span></p>
          <p>上次登录地点<span>广东东莞</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 15px; height: 336px;" class="table">
        <el-table :data="tableData" height="280" style="width: 100%">
          <el-table-column v-for="(val, key) in goodsLabel" :key="key" :prop="key" :label="val" class="scrollbar-demo-item"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="salesNum">
        <el-card shadow="hover" v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0}">
          <!-- <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color}"></i> -->
          <el-icon :style="{ background: item.color}">
            <component class="icons" :is="item.icon"></component>
          </el-icon>
          <div class=" details">
            <p class="num">￥{{ item.value }}</p>
            <p class="label">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 245px; margin-top: 5px" shadow="hover">
        <!-- 折线图 -->
        <LineChart :lineData="lineData"></LineChart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <!-- 柱状图 -->
          <BarChart :barData="barData"></BarChart>
        </el-card>
        <el-card shadow="hover">
          <!-- 饼图 -->
          <PieChart :pieData="pieData"></PieChart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'
import { useStore } from 'vuex'
import LineChart from '../../components/echarts/LineChart.vue'
import BarChart from '../../components/echarts/BarChart.vue'
import PieChart from '../../components/echarts/PieChart.vue'
export default defineComponent({
  name: 'Home',
  setup() {
    const { proxy } = getCurrentInstance() //相当于vue2中的this
    const store = useStore()
    let tableData = ref([])
    const goodsLabel = {
      name: '品牌',
      todayBuy: '今日购买',
      monthBuy: '本月购买',
      totalBuy: '总购买'
    }
    let countData = ref([])
    let lineData = ref({})
    let pieData = ref({})
    const barData = ref({})
    const getTableData = async () => {
      const res = await proxy.$api.getTableData()
      // console.log(res)
      tableData.value = res.tableData
    }
    const getImgSrc = user => {
      return new URL(`../../assets/imgs/${user}`, import.meta.url).href
    }
    const userInfo = store.state.userInfo
    const getCountData = async () => {
      const res = await proxy.$api.getCountData()
      console.log(res)
      countData.value = res.countData
    }
    // 关于echarts表格的渲染部分
    let xOption = reactive({
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
    let pieOptions = reactive({
      tooltip: {
        trigger: 'item'
      },
      color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
      series: []
    })
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
    let orderData = reactive({
      xData: [],
      legend: [],
      series: []
    })
    let userData = reactive({
      xData: [],
      series: []
    })
    let videoData = reactive({
      series: []
    })
    const getChartsData = async () => {
      const result = await proxy.$api.getChartsData()
      let res = result.orderData
      let userRes = result.userData
      let videoRes = result.videoData
      const keyArray = Object.keys(res.data[0])
      orderData.xData = res.date
      orderData.legend = keyArray
      const series = []
      keyArray.forEach(key => {
        series.push({
          name: key,
          data: res.data.map(item => item[key]),
          type: 'line'
        })
      })
      orderData.series = series
      lineData.value = orderData

      userData.xData = userRes.map(item => item.date)
      userData.series = [
        {
          name: '新增用户',
          data: userRes.map(item => item.new),
          type: 'bar'
        },
        {
          name: '活跃用户',
          data: userRes.map(item => item.active),
          type: 'bar'
        }
      ]
      barData.value = userData

      videoData.series = {
        data: videoRes,
        type: 'pie'
      }
      pieData.value = videoData
    }
    onMounted(() => {
      getTableData()
      getCountData()
      getChartsData()
    })
    return {
      tableData,
      goodsLabel,
      countData,
      userInfo,
      lineData,
      barData,
      pieData,
      getImgSrc
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    .el-card {
      border-radius: 10px;
    }
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-right: 40px;
      border: 2px solid skyblue;
    }
    .user-info {
      .name {
        font-size: 28px;
        margin-bottom: 10px;
      }
      .role {
        color: #999;
      }
    }
  }
  .user-login {
    p {
      line-height: 28px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .table {
    :deep(thead) {
      font-weight: 700;
    }
  }
  .salesNum {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-icon {
      width: 55px;
      height: 55px;
    }
    .icons {
      width: 50%;
      height: 50%;
      font-size: 20px;
      text-align: center;
      line-height: 55px;
      color: #fff;
    }
    .details {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 18px;
        margin-bottom: 5px;
        height: 15px;
        line-height: 15px;
      }
      .label {
        font-size: 14px;
        color: #999;
        text-align: center;
      }
    }
    .el-card {
      width: 31%;
      margin-bottom: 10px;
    }
  }
  .graph {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 49%;
      height: 210px;
    }
  }
}
</style>