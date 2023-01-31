<template>
  <el-dialog title="编辑角色" :visible.sync="dialogVisible" @closed="checkList = []">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-row type="flex" justify="center">
        <el-button type="primary" @click="sendData">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getAllRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { allotRole } from '@/api/employees'
export default {
  data() {
    return {
      dialogVisible: false,
      checkList: [],
      roleList: [],
      userId: null
    }
  },
  created() {
    this.getAllRoleList()
  },
  methods: {
    async getAllRoleList() {
      const res = await getAllRoleList()
      this.roleList = res.data.rows
    },
    async getUserDetailById(userId) {
      this.userId = userId
      const res = await getUserDetailById(userId)
      this.checkList = res.data.roleIds
    },
    async sendData() {
      await allotRole({
        id: this.userId,
        roleIds: this.checkList
      })
      this.$message.success('编辑角色权限成功')
      this.dialogVisible = false
    }
  }
}
</script>

<style>

</style>
