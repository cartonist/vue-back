import { createStore } from 'vuex'
import Cookie from 'js-cookie'
export default createStore({
  state: {
    isCollapse: false,
    currentMenu : null,
    tagsList: [
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'House',
        url: 'Home/Home'
      }
    ],
    menu: [],
    token: '',
    userInfo: {}
  },
  mutations: {
    updateIsCollpase(state, payload){
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, item) {
      if(item.path === '/home'){
        state.currentMenu = null
      } else {
        state.currentMenu = item
        const index = state.tagsList.findIndex(tag => tag.name == item.name)
        index == -1 ? state.tagsList.push(item): ''
      }
    },
    delTag(state, item) {
      state.tagsList =  state.tagsList.filter(tag => tag.name != item.name)
    },
    setMenu(state, val) {
      state.menu = val
      // 数据持久化
      localStorage.setItem('menu', JSON.stringify(val))
    },
    // 在页面刷新的时候调用，即vue实例的初始化
    // 设置菜单和动态路由
    addMenu(state, router) {
      if(!localStorage.getItem('menu')) return
      state.menu = JSON.parse(localStorage.getItem('menu'))

      const menuArray = []
      state.menu.forEach(item => {
        if(item.children) {
          item.children = item.children.map(item => {
            let url = `../views/${item.url}.vue`
            item.component =  () => import(/* @vite-ignore */url)
            return item
          })
          menuArray.push(...item.children)
        } else {
          let url = `../views/${item.url}.vue`
          item.component =  () => import(/* @vite-ignore */url)
          menuArray.push(item)
        }
      })
      menuArray.forEach(item => {
       router.addRoute('main',item)
      })
    },
    cleanMenu(state) {
      state.menu = []
      localStorage.removeItem('menu')
    },
    setToken(state, val) {
      state.token = val
      Cookie.set('token', val)
    },
    clearToken(state) {
      state.token = ''
      Cookie.remove('token')
    },
    getToken(state) {
      state.token = state.token || Cookie.get('token')
    },
    setUserInfo(state, val) {
      state.userInfo = val
      Cookie.set('userInfo', JSON.stringify(val))
    },
    clearUserInfo(state) {
      state.userInfo = {}
      Cookie.remove('userInfo')
    },
    getUserInfo(state) {
      if(!Cookie.get('userInfo')) return
      state.userInfo =  JSON.parse(Cookie.get('userInfo'))
    }

  }
})