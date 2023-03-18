<template>
  <el-aside width="auto">
    <h3>{{ $store.state.isCollapse?'后台':'通用后台管理系统' }}</h3>
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" :collapse=$store.state.isCollapse :collapse-transition="false">
      <el-menu-item v-for="item in noChildren()" :index="item.path" :key="item.path" @click="clickMenu(item)">
        <el-icon>
          <component class="icons" :is="item.icon"></component>
        </el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu v-for="item in haveChildren()" :key="item.path" :index="item.path">
        <template #title>
          <el-icon>
            <component class="icons" :is="item.icon"></component>
          </el-icon>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(subItem, subIndex) in item.children" :index="subItem.path" :key="subIndex" @click="clickMenu(subItem)">
            <el-icon>
              <component class="icons" :is="subItem.icon"></component>
            </el-icon>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'CommonAside',
  setup() {
    const router = useRouter()
    const store = useStore()
    const menuData = store.state.menu
    // 过滤出没有子菜单的菜单
    const noChildren = () => {
      return menuData.filter(x => !x.children) // 返回一个表达式的值,箭头函数可以简写
    }
    // 过滤出有子菜单菜单
    const haveChildren = () => {
      return menuData.filter(x => x.children)
    }
    const clickMenu = item => {
      store.commit('selectMenu', item)
      router.push({ name: item.name })
    }
    return {
      noChildren,
      haveChildren,
      clickMenu
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  // min-height: 400px;
}
.el-aside {
  &::-webkit-scrollbar {
    display: none;
  }
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
  .el-menu {
    border-right: none;
  }
}
</style>