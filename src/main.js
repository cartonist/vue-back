import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './assets/less/index.less'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'
import './api/mock.js'
import api from './api/api'

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 登录成功后，检测路由是否具有
const checkRoute = (path) => {
  const length = router.getRoutes().filter(item => item.path == path).length
  if(length) {
    return true
  } else {
    return false
  }
}
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.token
  if(!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else if(!checkRoute(to.path)) {
    next({name: 'home'})
  } else {
    next()
  }
})


// app.use(ElementPlus)
app.config.globalProperties.$api = api
store.commit('addMenu', router)
store.commit('getUserInfo')

app.use(router).use(store)

app.mount('#app')
