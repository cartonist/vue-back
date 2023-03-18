<template>
  <router-view></router-view>
</template>

<script>
import { defineComponent } from 'vue'
// import { useRouter } from 'vue-router'
// import { useStore } from 'vuex'

export default defineComponent({
  // setup() {
  //   const store = useStore()
  //   const router = useRouter()
  //   store.commit('addMenu', router)
  // }
})
</script>

<style lang="less">
#app {
  height: 100%;
  overflow: hidden;
}
</style>
