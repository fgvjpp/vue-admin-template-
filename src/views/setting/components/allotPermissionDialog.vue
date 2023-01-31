<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" @closed="hiddenDialog">
    <el-tree
      :key="roleDetail.id"
      ref="treeList"
      v-loading="loading"
      :data="treeList"
      show-checkbox
      node-key="id"
      :props="{label:'name'}"
      :check-strictly="true"
      :default-checked-keys="roleDetail.permIds"
    />
    <template #footer>
      <el-row type="flex" justify="center">
        <el-button type="primary" @click="editRolePerm">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getAllPermissionList } from '@/api/permission'
import { getRoleDetail, allotRolePerm } from '@/api/setting'
import { digui2 } from '@/utils/TreeDigui'
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      title: '',
      treeList: [],
      roleDetail: {}
    }
  },
  methods: {
    // 点击显示弹窗
    async showDialog(name, roleId) {
      const arr = []
      this.loading = true
      this.dialogVisible = true
      this.title = `为【${name}】分配权限`
      const res = await getAllPermissionList()
      const res2 = await getRoleDetail(roleId)
      res.data.forEach(item => {
        if (item.pid === '0') {
          arr.push(digui2(res.data, item))
        }
      })
      this.roleDetail = res2.data
      this.treeList = arr
      this.loading = false
    },
    // 分配角色权限
    async editRolePerm() {
      await allotRolePerm({ id: this.roleDetail.id, permIds: this.$refs.treeList.getCheckedKeys() })
      this.$message.success('分配权限成功')
      this.dialogVisible = false
    },
    hiddenDialog() {
      this.roleDetail = {}
    }

  }
}
</script>

<style>
</style>
