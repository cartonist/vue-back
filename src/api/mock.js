import Mock from 'mockjs'
import HomeApi from './mockData/home.js'
import UserApi from './mockData/user.js'
import permissionApi from './mockData/permission.js'

// 拦截请求
Mock.mock('/home/getData', HomeApi.getHomeData)
// 本地获取user的数据
Mock.mock(/user\/getUser/, UserApi.getUserList)
Mock.mock(/user\/addUser/,'post',UserApi.createUser)
Mock.mock(/user\/editUser/,'post',UserApi.updateUser)
Mock.mock(/user\/delUser/,'get',UserApi.deleteUser)
Mock.mock(/permission\/getMenu/, 'post',permissionApi.getMenu)