<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pageTools>
        <template v-slot:left>
          <el-button type="danger" @click="emptyData">点击清空数据</el-button>
          <el-button type="primary" @click="addAll">点击批量添加数据</el-button>
        </template>
      </pageTools>
      <el-card v-loading="cardLoading" class="tree-card">
        <barColumn class="barColumn" :data="departmentTitle" />
        <el-tree :data="departmentData" :default-expand-all="true" :props="defaultProps">
          <barColumn slot-scope="{data}" :data="data" @applyData="applyData" @openDialog="openDialog" />
        </el-tree>
      </el-card>
    </div>
    <departmentsDialog ref="openDialog" @applyData="applyData" />
  </div>
</template>

<script>
import barColumn from './components/barColumn.vue'
import departmentsDialog from './components/departmentsDialog.vue'
import { getDepartmentList, delDepartment, addDepartmentList } from '@/api/departments'
import { digui } from '@/utils/TreeDigui'
export default {
  components: {
    barColumn,
    departmentsDialog
  },
  data() {
    return {
      cardLoading: false,
      departmentTitle: {
        name: '',
        manager: '负责人',
        isShow: true
      },
      departmentData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.applyData()
  },
  methods: {
    openDialog(data, isEdit) {
      this.$refs.openDialog.isShow = true
      this.$refs.openDialog.currentDepartmentData = data
      this.$refs.openDialog.departmentData = this.departmentData
      isEdit && (this.$refs.openDialog.isEdit = isEdit)
    },
    async applyData(message) {
      this.cardLoading = true
      const res = await getDepartmentList()
      this.cardLoading = false
      this.departmentTitle.name = res.data.companyName
      this.departmentData = digui(res.data.depts)
      message && this.$message.success(message)
    },
    emptyData() {
      digui2(this.departmentData)
    },
    async addAll() {
      for (let i = 0; i < 100; i++) {
        await addDepartmentList({
          name: '211',
          code: '312',
          manager: '管理员',
          introduce: '12',
          pid: '1175310929766055936'
        })
        console.log('添加成功' + i)
      }
    }
  }
}

// 递归删除所有数据
async function digui2(data) {
  for (let i = 0; i < data.length; i++) {
    try {
      if (data[i].children) {
        digui2(data[i].children)
      }
      await delDepartment(data[i].id)
      console.log('删除成功' + i)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
::v-deep .el-tree-node {
  margin: 5px 0;
}
.el-tree {
  border-top: 4px solid #ccc;
}
.barColumn {
  font-size: 20px !important;
  ::v-deep .el-dropdown {
    font-size: 20px !important;
  }
}

</style>
