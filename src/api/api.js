/**
 * 整个项目api的管理
 */
import request from './request'
export default {
  // home组件 左侧的表格数据获取
  getTableData(params) {
    return request({
      url: '/home/getTableData',
      method: 'get',
      data: params,
      mock: true
    })
  },
  getCountData() {
    return request({
      url: '/home/getCountData',
      method: 'get',
      mock: true
    })
  },
  getChartsData() {
    return request({
      url: '/home/getChartsData',
      method: 'get',
      mock: true
    })
  },
  getUserData(params) {
    return request({
      url: '/user/getUser',
      method: 'get',
      // 如果mock的值是true，则使用的是线上的fastmock API
      mock: false,
      data: params
    })
  },
  addUser(params) {
    return request ({
      url: '/user/addUser',
      method: 'post',
      mock: false,
      data: params
    })
  },
  editUser(params) {
    return request ({
      url: '/user/editUser',
      method: 'post',
      mock: false,
      data: params
    })
  },
  delUser(params) {
    return request ({
      url: '/user/delUser',
      method: 'get',
      mock: false,
      data: params
    })
  },
  getMenu(params) {
    return request({
      url: '/permission/getMenu',
      method: 'post',
      mock: false,
      data: params
    })
  }
}