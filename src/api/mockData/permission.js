import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === '123456') {
      return {
        code: 200,
        data: {
          userInfo: {
            img: 'user',
            name: 'admin',
            access: '超级管理员'
          },
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'House',
              url: 'Home/Home'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'ShoppingCart',
              url: 'Mall/Mall'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'User',
              url: 'User/User'
            },
            {
              label: '其他',
              icon: 'ZoomIn',
              path: '/other',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '其他1',
                  icon: 'Filter',
                  url: 'Page1'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '其他2',
                  icon: 'Switch',
                  url: 'Page2'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiao' && password === 'xiao') {
      return {
        code: 200,
        data: {
          userInfo: {
            img: 'user1',
            name: 'xiao',
            access: '管理员'
          },
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home/Home'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 's-goods',
              url: 'Mall/Mall'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '用户名或密码错误'
        }
      }
    }
  }
}
