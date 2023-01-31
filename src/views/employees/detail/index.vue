<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <el-form ref="userForm" :model="userForm" :rules="rule" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item prop="username" label="姓名:">
                <el-input v-model="userForm.username" style="width:300px" @focus="status.nameStatus = true" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input v-model="userForm.password" style="width:300px" type="password" @focus="emptyPwd" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveEmployeesInfo">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <userInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <job-info />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveEmployeesInfo } from '@/api/employees'
import userInfo from './components/user-info.vue'
import jobInfo from './components/job-info.vue'
export default {
  name: 'UserInfo',
  components: {
    userInfo,
    jobInfo
  },
  data() {
    return {
      status: {
        pwdStatus: false,
        nameStatus: false
      },
      userForm: {
        id: '',
        username: '',
        password: '*******'
      },
      rule: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.applyData()
  },
  methods: {
    // 渲染页面数据
    async applyData() {
      const res = await getUserDetailById(this.$route.params.id)
      this.userForm.id = this.$route.params.id
      this.userForm.username = res.data.username
    },
    // 更新用户名密码
    async saveEmployeesInfo() {
      try {
        if (!this.status.pwdStatus && !this.status.nameStatus) return this.$message.info('没有需要修改的信息')
        if (!this.status.pwdStatus) this.userForm.password = ''
        await this.$refs.userForm.validate()
        await saveEmployeesInfo(this.userForm)
        this.applyData()
        this.status.pwdStatus = false
        this.status.nameStatus = false
        this.userForm.password = '*******'
        this.$message.success('更新成功')
      } catch (err) {
        console.log(err)
      }
    },
    emptyPwd() {
      this.userForm.password = null
      this.status.pwdStatus = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

