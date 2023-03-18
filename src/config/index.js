/**
 * 环境变量
 * 一般在企业级项目里面有三个环境
 * 开发环境
 * 测试环境
 * 线上环境
 */
// 当前的环境，三个中的一种
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  development: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/5241955e429fa209aaec1937365dc410/api'
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: 'https://www.fastmock.site/mock/5241955e429fa209aaec1937365dc410/api'
  },
  pro: {
    baseApi: '//future.com/api',
    mockApi: 'https://www.fastmock.site/mock/5241955e429fa209aaec1937365dc410/api'
  }
}

export default {
  env,
  // mock总开关
  mock: true,
  ...EnvConfig[env] // 拿到的是baseApi和mockApi
}