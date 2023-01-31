<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template #left>
          <el-button type="primary" size="small" @click="addPermission">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table :default-expand-all="true" row-key="id" :data="treeList" border>
        <el-table-column prop="name" width="160px" label="权限名称" />
        <el-table-column prop="code" align="center" label="权限标识" />
        <el-table-column prop="description" align="center" label="权限描述" />
        <el-table-column align="center" label="操作">
          <template v-slot="scoped">
            <el-button v-if="scoped.row.type !== 2" type="text" @click="addPermission(scoped.row.id,scoped.row.name,'添加')">添加</el-button>
            <el-button type="text" @click="addPermission(scoped.row.id,scoped.row.name,'编辑',scoped.row.pid)">编辑</el-button>
            <el-button type="text" @click="delpermission(scoped.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <dialog-permission ref="dialogPermission" @applyData="getAllPermissionList" />
  </div>
</template>

<script>
import { getAllPermissionList, removePermission } from '@/api/permission'
import { digui2 } from '@/utils/TreeDigui'
import dialogPermission from './components/dialogPermission.vue'
export default {
  components: {
    dialogPermission
  },
  data() {
    return {
      treeList: []
    }
  },
  created() {
    this.getAllPermissionList()
  },
  methods: {
    // 添加编辑权限
    async addPermission(id, name, type, pid) {
      if (type === '添加') {
        this.$refs.dialogPermission.permissionText = `给 ${name} 权限下添加权限点`
        this.$refs.dialogPermission.formData.type = 2
        this.$refs.dialogPermission.formData.pid = id
      } else if (type === '编辑') {
        await this.$refs.dialogPermission.getCurrentPermissions(id)
        this.$refs.dialogPermission.permissionText = `编辑 ${name} 权限点`
        this.$refs.dialogPermission.formData.id = id
        if (pid === '0') {
          this.$refs.dialogPermission.formData.type = 1
        } else {
          this.$refs.dialogPermission.formData.type = 2
          this.$refs.dialogPermission.formData.pid = pid
        }
      } else {
        this.$refs.dialogPermission.permissionText = '添加权限点'
        this.$refs.dialogPermission.formData.type = 1
      }
      this.$refs.dialogPermission.showDialog = true
    },
    // 获取所有权限列表
    async getAllPermissionList() {
      const arr = []
      const res = await getAllPermissionList()
      res.data.forEach(item => {
        if (item.pid === '0') {
          arr.push(digui2(res.data, item))
        }
      })
      this.treeList = arr
    },
    // 删除权限
    async delpermission(id) {
      await removePermission(id)
      this.getAllPermissionList()
      this.$message.success('删除成功')
    }
  }
}
</script>

  <style>

  </style>

