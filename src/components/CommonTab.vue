<template>
  <div class="tags">
    <el-tag v-for="(tag, index) in tags" :key="tag.name" :closable="tag.name !== 'home'" :disable-transitions="false" :effect="$route.name == tag.name ? 'dark': 'plain'" @click="onClickTag(tag)" @close="handleClose(tag, index)">{{ tag.label }}</el-tag>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'CommonTab',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const tags = computed(() => {
      return store.state.tagsList
    })
    const onClickTag = tag => {
      router.push({ name: tag.name })
    }
    const handleClose = (tag, index) => {
      const length = tags.value.length
      store.commit('delTag', tag)
      if (tag.name != route.name) return
      if (index == length - 1) {
        router.push({ name: tags.value[index - 1].name })
      } else {
        router.push({ name: tags.value[index].name })
      }
    }
    return {
      tags,
      onClickTag,
      handleClose
    }
  }
}
</script>
<style lang="less" scoped>
.tags {
  padding: 10px;
  width: 100%;
  .el-tag {
    margin-left: 15px;
    cursor: pointer;
  }
}
</style>