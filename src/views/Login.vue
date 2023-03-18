<template>
  <div class="login">
    <h3>系统登录</h3>
    <el-form :model="loginForm" class="login-container" :rules="rules" ref="form" @keyup.enter="login">
      <el-form-item label="用户名" prop="username">
        <el-input type="input" placeholder="请输入账号" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance } from 'vue'
import { reactive } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup() {
    const { proxy } = getCurrentInstance()
    const store = useStore()
    const router = useRouter()
    const loginForm = reactive({
      username: '',
      password: ''
    })
    const rules = {
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      ]
    }
    const login = async () => {
      const res = await proxy.$api.getMenu(loginForm)
      if (res.menu) {
        store.commit('setMenu', res.menu)
        store.commit('addMenu', router)
        store.commit('setToken', res.token)
        store.commit('setUserInfo', res.userInfo)
        router.push({
          name: 'home'
        })
      } else {
        proxy.$refs.form.resetFields()
        ElMessage({
          showClose: true,
          message: '用户名或密码错误',
          type: 'error'
        })
      }
    }
    return {
      loginForm,
      login,
      rules
    }
  }
})
</script>


<style lang="less" scoped>
.login {
  width: 350px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  box-shadow: 0 0 25px #cacaca;
  margin: 180px auto;
  h3 {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 20px;
    color: #505450;
    font-weight: 700;
  }
}
.login-container {
  width: 100%;
  padding: 0 50px 15px 20px;
  :deep(.el-form-item__label) {
    width: 80px;
  }
  :deep(.el-form-item__content) {
    .el-button {
      margin-left: 125px;
    }
  }
  // :deep(.el-input__wrapper) {
  //   border-radius: 10px;
  // }
  :deep(.el-input__inner) {
    margin: 5px 0;
  }
}
</style>