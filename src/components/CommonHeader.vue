<template>
  <el-header>
    <div class="l-content">
      <el-button size="small" @click="handleCollapse">
        <el-icon :size="20">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" :src="getImgSrc(`${img}.webp`)" alt="">
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'CommonHeader',
  // const imgSrc = require("../assets/imgs/user.webp")  webpack引入静态资源的方式
  setup() {
    let store = useStore()
    const router = useRouter()
    // vue3+vite动态引入静态资源的方式    import.mata.url表示当前组件的路径
    const getImgSrc = user => {
      return new URL(`../assets/imgs/${user}`, import.meta.url).href
    }
    const handleCollapse = () => {
      store.commit('updateIsCollpase')
    }
    const handleLogOut = () => {
      store.commit('cleanMenu')
      store.commit('clearToken')
      store.commit('clearUserInfo')
      router.push({
        name: 'login'
      })
    }
    const current = computed(() => {
      return store.state.currentMenu
    })
    // 获取用户头像
    const img = store.state.userInfo.img
    return {
      getImgSrc,
      handleCollapse,
      current,
      handleLogOut,
      img
    }
  }
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
  .l-content {
    display: flex;
    align-items: center;
    button {
      margin-right: 20px;
    }
    color: #fff;
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .bread {
    :deep(span) {
      color: #fff !important;
      cursor: pointer !important;
    }
  }
}
</style>