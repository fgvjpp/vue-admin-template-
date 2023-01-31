<template>
  <!-- 放置一个弹层 用来编辑新增节点 -->
  <el-dialog :title="permissionText" :visible.sync="showDialog" @closed="dialogClose">
    <!-- 表单 -->
    <el-form ref="perForm" :model="formData" label-width="120px">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name" style="width:90%" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" style="width:90%" />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input v-model="formData.description" style="width:90%" />
      </el-form-item>
      <el-form-item label="企业是否可见">
        <el-switch
          v-model="formData.enVisible"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="1"
          inactive-value="0"
          active-text="可见"
          inactive-text="不可见"
        >
          />
        </el-switch></el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" type="primary" @click="sendData">确定</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addPermission, editPermission, getCurrentPermissions } from '@/api/permission'
export default {
  data() {
    return {
      permissionText: '',
      showDialog: false,
      formData: {
        enVisible: '0',
        name: '',
        code: '',
        description: '',
        pid: '0',
        type: null
      }
    }
  },
  methods: {
    cancel() {
      this.showDialog = false
    },
    async sendData() {
      this.permissionText.includes('编辑') ? await editPermission(this.formData) : await addPermission(this.formData)
      this.$emit('applyData')
      this.$message.success(this.permissionText.includes('编辑') ? '编辑成功' : '添加成功')
      this.showDialog = false
    },
    dialogClose() {
      this.$refs.perForm.resetFields()
      this.formData = {
        enVisible: '0',
        name: '',
        code: '',
        description: '',
        pid: '0',
        type: null
      }
    },
    // 获取当前权限点
    async getCurrentPermissions(id) {
      const res = await getCurrentPermissions(id)
      this.formData = res.data
    }
  }
}
</script>

<style>

</style>
