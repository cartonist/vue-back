<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside></common-aside>
      <el-container class="r-container">
        <common-header></common-header>
        <common-tab></common-tab>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonAside from '../components/CommonAside.vue'
import CommonTab from '../components/CommonTab.vue'
export default defineComponent({
  name: 'Main',
  components: {
    CommonHeader,
    CommonAside,
    CommonTab
  }
})
</script>

<style lang="less" scoped>
.common-layout {
  height: 100%;
  .lay-container {
    height: 100%;
    align-items: flex-start;
    .r-container {
      height: 100%;
    }
    & > .el-aside {
      height: 100%;
      background-color: #545c64;
    }
  }
}
.r-container {
  flex-wrap: wrap;
  .el-main {
    padding-top: 0;
    height: calc(100% - 105px);
  }
}
</style>
