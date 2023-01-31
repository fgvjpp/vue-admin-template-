<template>
  <el-row type="flex" style="width: 100%;margin:20px 0;" align="middle">
    <el-col>
      <span>{{ data.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ data.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :disabled="!checkPermissions('add-bumen')" command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!data.isShow" :disabled="!checkPermissions('role-bumen')" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!data.isShow" :disabled="!checkPermissions('deleet-bumen')" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartment } from '@/api/departments'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleCommand(option) {
      switch (option) {
        case 'add':
          this.$emit('openDialog', this.data)
          break
        case 'edit':
          this.$emit('openDialog', this.data, true)
          break
        case 'del':
          this.$confirm('确定要删除当前部门吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delDepartment(this.data.id).then(res => {
              this.$emit('applyData')
              this.$message.success('删除成功')
            })
          }).catch(() => {
            this.$message.info('已取消删除')
          })
          break
      }
    }
  }
}
</script>

<style>

</style>
