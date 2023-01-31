<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :visible.sync="isShow" :close-on-click-modal="false" :title="isEdit ? '修改部门':'新增部门'" @closed="dialogClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="form" :model="fromData" :rules="rules" label-width="120px">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="fromData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="fromData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="manager" label="部门负责人">
        <el-select v-model="fromData.manager" style="width:80%" placeholder="请选择" @focus="getUserList">
          <el-option v-for="item in simpleUserInfo" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input v-model="fromData.introduce" resize="none" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="sendData">确定</el-button>
        <el-button size="small" @click="isShow = false">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addDepartmentList, editDepartmentList } from '@/api/departments'
import { getSimpleUserInfo } from '@/api/employees'
export default {
  data() {
    const verifyDepartmentName = (rule, value, callback) => {
      if (this.isEdit) {
        if (this.fromData.pid === '') {
          this.departmentData.some(item => item.name === value && this.fromData.id !== item.id) ? callback(new Error('当前部门同级名称相同')) : callback()
        }

        if (digui(this.departmentData, '', this.fromData) || this.currentDepartmentData.children && digui(this.currentDepartmentData.children, this.fromData.name)) {
          callback(new Error('当前部门同级或下级名称相同'))
        } else {
          callback()
        }
      } else {
        if (this.currentDepartmentData.name === value) {
          return callback(new Error('部门名称不能是自己'))
        }
        if (this.currentDepartmentData.children) {
          digui(this.currentDepartmentData.children, value) ? callback(new Error('部门名称不能同名')) : callback()
        } else {
          callback()
        }
      }
    }
    const verifyDepartmentCode = (rule, value, callback) => {
      if (!this.isEdit) {
        digui(this.departmentData, value) ? callback(new Error('当前组织架构中已有部门使用该编码')) : callback()
      } else {
        callback()
      }
    }
    return {
      isShow: false,
      isEdit: false,
      departmentData: null,
      currentDepartmentData: null,
      simpleUserInfo: [],
      fromData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { trigger: 'blur', required: true, message: '部门名称不能为空' },
          { trigger: 'blur', min: 1, max: 50, message: '部门名称只允许1-50个字符' },
          { trigger: 'blur', validator: verifyDepartmentName }
        ],
        code: [
          { trigger: 'blur', required: true, message: '部门编码不能为空' },
          { trigger: 'blur', min: 1, max: 50, message: '部门编码只允许1-50个字符' },
          { trigger: 'blur', validator: verifyDepartmentCode }
        ],
        manager: [
          { trigger: 'change', required: true, message: '部门负责人不能为空' }
        ],
        introduce: [
          { trigger: 'blur', required: true, message: '部门介绍不能为空' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍只允许1-300个字符' }
        ]
      }
    }
  },
  watch: {
    isEdit(val) {
      if (val) {
        this.fromData = { ...this.currentDepartmentData }
      }
    }
  },
  methods: {
    dialogClose() {
      this.isShow = false
      setTimeout(() => {
        this.isEdit = false
      }, 200)
      this.fromData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$refs.form.resetFields()
    },
    async getUserList() {
      const res = await getSimpleUserInfo()
      this.simpleUserInfo = res.data
    },
    async sendData() {
      try {
        const isOk = await this.$refs.form.validate()
        if (isOk) {
          if (this.isEdit) {
            await editDepartmentList(this.fromData.id, this.fromData)
          } else {
            this.fromData.pid = this.currentDepartmentData.id
            await addDepartmentList(this.fromData)
            this.dialogClose()
          }
          this.$emit('applyData', this.isEdit ? '修改成功' : '添加成功')
          this.dialogClose()
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
function digui(data, val, form) {
  let flag = false
  data.some(item => {
    if (item.children) {
      if (digui(item.children, val, form)) {
        flag = true
        return true
      }
    }
    if (form) {
      if (item.id === form.pid) {
        item.children.some(item2 => {
          if (item2.id !== form.id) {
            if (item2.name === form.name) {
              flag = true
              return true
            }
          }
        })
      }
    } else {
      if (item.code === val) {
        flag = true
        return true
      }
      if (item.name === val) {
        flag = true
        return true
      }
    }
  })
  return flag
}
</script>

<style lang="scss" scoped>
</style>
