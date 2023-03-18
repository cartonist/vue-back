<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-dialog v-model="dialogVisible" :title="dialogTitle == 'add' ? '添加用户' : '编辑用户'" width="50%" :before-close="handleClose">
      <el-form :inline="true" :model="userForm" :rules="rules" class="userForm" ref="formUser">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="userForm.age" placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="userForm.sex" placeholder="请选择性别">
            <el-option label="男" value="1" />
            <el-option label="女" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="userForm.birth" type="date" placeholder="请选择出生日期" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="userForm.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onClickSubmit">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-form :inline="true" :model="formInline">
      <el-form-item>
        <el-input @keyup.enter="onSubmit" @keyup.esc="formInline.keyword = ''" v-model.trim="formInline.keyword" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-button class="search" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list" stripe style="width: 100%" height="510">
      <el-table-column v-for="item in tableLabel" :key="item.prop" :prop="item.prop" :label="item.label" />
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination small background layout="prev, pager, next" :page-size="20" :total="config.total" class="pager mt-4" @current-change="onChangePage" />
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue'

export default defineComponent({
  name: 'User',
  setup() {
    const { proxy } = getCurrentInstance()
    let list = ref([])
    const tableLabel = reactive([
      {
        prop: 'name',
        label: '姓名'
      },
      {
        prop: 'age',
        label: '年龄'
      },
      {
        prop: 'sex',
        label: '性别'
      },
      {
        prop: 'birth',
        label: '出生日期',
        width: 200
      },
      {
        prop: 'addr',
        label: '地址',
        width: 320
      }
    ])
    let config = reactive({
      page: 1,
      total: 0,
      name: ''
    })
    let formInline = reactive({
      keyword: ''
    })
    // 控制模态框的显示隐藏
    let dialogVisible = ref(false)
    const getUserData = async config => {
      const res = await proxy.$api.getUserData(config)
      list.value = res.list.map(item => {
        item.sex = item.sex == 0 ? '女' : '男'
        return item
      })
      config.total = res.count
    }
    const onChangePage = page => {
      config.page = page
      getUserData(config)
    }
    const onSubmit = () => {
      config.name = formInline.keyword
      getUserData(config)
    }
    // 新增用户
    const handleAdd = () => {
      dialogTitle.value = 'add'
      dialogVisible.value = true
    }
    const handleClose = done => {
      ElMessageBox.confirm('确定要关闭吗?')
        .then(() => {
          proxy.$refs.formUser.resetFields()
          done()
        })
        .catch(() => {
          // catch error
        })
    }
    // 用户表单数据
    let userForm = reactive({
      name: '',
      age: '',
      sex: '',
      addr: '',
      birth: ''
    })
    onMounted(() => {
      getUserData(config)
    })
    // 确定添加
    const onClickSubmit = async () => {
      // 提交之前的统一验证
      proxy.$refs.formUser.validate(async valid => {
        if (valid) {
          if (dialogTitle.value == 'add') {
            const res = await proxy.$api.addUser(userForm)
            if (res) {
              proxy.$refs.formUser.resetFields() //前提是每个el-form-items都有prop
              dialogVisible.value = false
              getUserData(config)
            }
          } else {
            // userForm.sex == '男' ? (userForm.sex = '1') : (userForm.sex = '0') //table绑定的数据来自list，list中的sex已被修改，而后台需要的是数字字符串的格式
            // userForm.sex = userForm.sex == '女' ? '0' : '1'  ???
            if (userForm.sex == '男') {
              userForm.sex = '1'
            } else if (userForm.sex == '女') {
              userForm.sex = '0'
            }
            const res = await proxy.$api.editUser(userForm)
            if (res) {
              proxy.$refs.formUser.resetFields()
              dialogVisible.value = false
              getUserData(config)
            }
          }
        } else {
          ElMessage({
            showClose: true,
            message: '请输入正确的信息',
            type: 'error'
          })
        }
      })
    }
    // 取消添加
    const handleCancel = () => {
      proxy.$refs.formUser.resetFields()
      dialogVisible.value = false
    }
    // 对话框标题，用户判断
    let dialogTitle = ref('add')
    // 编辑用户
    const handleEdit = row => {
      dialogTitle.value = 'edit'
      dialogVisible.value = true
      // 在form渲染出来之后对form赋值，以免改变form的初始值
      proxy.$nextTick(() => {
        // 浅拷贝
        Object.assign(userForm, row)
      })
    }
    // 删除用户
    const handleDel = row => {
      ElMessageBox.confirm('确定要删除吗?')
        .then(async () => {
          await proxy.$api.delUser({
            id: row.id
          })
          ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          getUserData(config)
        })
        .catch(() => {
          // catch error
        })
    }
    const rules = {
      name: [{ required: true, message: '姓名是必填项', trigger: 'blur' }],
      age: [
        { required: true, message: '年龄是必填项', trigger: 'blur' },
        { type: 'number', message: '年龄必须是数字', trigger: 'blur' }
      ],
      sex: [{ required: true, message: '性别是必填项', trigger: 'blur' }],
      birth: [{ required: true, message: '生日是必填项', trigger: 'blur' }],
      addr: [{ required: true, message: '地址是必填项', trigger: 'blur' }]
    }
    return {
      list,
      tableLabel,
      config,
      onChangePage,
      formInline,
      onSubmit,
      dialogVisible,
      handleClose,
      userForm,
      onClickSubmit,
      rules,
      handleCancel,
      handleEdit,
      dialogTitle,
      handleAdd,
      handleDel
    }
  }
})
</script>


<style lang="less" scoped>
.user-header {
  .userForm {
    .el-form-item {
      // display: flex;
      align-items: center;
      width: 280px;
      margin: 10px 20px;
    }
    flex-wrap: wrap;
    :deep(.el-input__wrapper) {
      padding: 5px 15px;
    }
    :deep(.el-form-item__label) {
      width: 88px;
    }
  }
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  .search {
    margin-left: 5px;
  }
  .el-form-item {
    margin: 0;
  }
}
.table {
  height: calc(100% - 50px);
  position: relative;
  :deep(thead) {
    font-weight: 700;
  }
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .pager {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>