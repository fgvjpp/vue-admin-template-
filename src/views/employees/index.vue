<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <span>
            <i class="el-icon-info" />
            共{{ page.total }}条记录
          </span>
        </template>
        <template #right>
          <el-button size="small" type="warning" @click="$router.push('/UploadExcel')">导入</el-button>
          <el-button size="small" type="danger" @click="deriveExecel">导出</el-button>
          <el-button :disabled="!checkPermissions('POINT-USER-ADD')" size="small" type="primary" @click="dialogVisible = true">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card v-loading="cardLoading">
        <el-table :data="employeesList" border>
          <el-table-column label="序号" sortable="">
            <template v-slot="scoped">
              {{ scoped.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" sortable="" />
          <el-table-column prop="userImg" label="头像" sortable="">
            <template slot-scope="{row}">
              <div class="userImg">
                <img v-imgError :src="row.staffPhoto" @click="showErweima(row.staffPhoto)">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column :formatter="formOfEmploymentFormatter" prop="formOfEmployment" label="聘用形式" sortable="" />
          <el-table-column prop="departmentName" label="部门" sortable="" />
          <el-table-column label="入职时间" sortable="">
            <template v-slot="scoped">
              {{ scoped.row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template v-slot="scoped">
              <el-switch :value="scoped.row.enableState === 1" active-color="#13ce66" inactive-color="#ff4949" disabled />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="scoped">
              <el-button type="text" size="small" @click="$router.push('/employees/detail/' + scoped.row.id)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole(scoped.row.id)">角色</el-button>
              <el-button :disabled="!checkPermissions('point-user-delete')" type="text" size="small" @click="delEmployees(scoped.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination :page-sizes="[5,8,10,12,15]" :page-size="page.size" :total="page.total" layout="sizes,prev, pager, next" @size-change="currentSizes" @current-change="currentPageIndex" />
        </el-row>
      </el-card>
    </div>
    <el-dialog :close-on-click-modal="false" title="新增员工" :visible.sync="dialogVisible" @closed="dialogClose">
      <el-form ref="addEmployeesForm" :model="addEmployeesForm" :rules="rules" label-width="120px">
        <el-form-item prop="username" label="姓名">
          <el-input v-model="addEmployeesForm.username" style="width:50%" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item prop="mobile" label="手机">
          <el-input v-model="addEmployeesForm.mobile" style="width:50%" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item prop="timeOfEntry" label="入职时间">
          <el-date-picker v-model="addEmployeesForm.timeOfEntry" style="width:50%" placeholder="请选择入职时间" @change="checkTwoTime" />
        </el-form-item>
        <el-form-item prop="formOfEmployment" label="聘用形式">
          <el-select v-model="addEmployeesForm.formOfEmployment" style="width:50%" placeholder="请选择">
            <el-option v-for="item in constant.hireType" :key="item.id" :label="item.value" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="workNumber" label="工号">
          <el-input v-model="addEmployeesForm.workNumber" style="width:50%" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item prop="departmentName" label="部门">
          <el-input v-model="addEmployeesForm.departmentName" style="width:50%" placeholder="请选择部门" @focus="getDepartmentName" />
          <div v-if="treeStatus" class="departmentBox">
            <el-tree class="departmentList" :default-expand-all="true" :data="departmentList" :props="{label:'name'}" @node-click="getTreeName" />
          </div>
        </el-form-item>
        <el-form-item prop="correctionTime" label="转正时间">
          <el-date-picker v-model="addEmployeesForm.correctionTime" style="width:50%" placeholder="请选择转正时间" @change="checkTwoTime" />
        </el-form-item>
      </el-form>
      <!-- footer插槽 -->
      <template v-slot:footer>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button type="primary" size="small" @click="addEmployees">确定</el-button>
            <el-button size="small" @click="dialogVisible = false">取消</el-button>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
    <editRole ref="editRole" />
    <erweima ref="erweima" />
  </div>
</template>

<script>
import constant from '@/utils/constant/employees'
import erweima from './components/erweima.vue'
import editRole from './components/editRole.vue'
import { digui } from '@/utils/TreeDigui'
import { getDepartmentList } from '@/api/departments'
import { getEmployeesList, delEmployeesList, addEmployees } from '@/api/employees'
export default {
  name: 'UserInfo',
  components: {
    erweima,
    editRole
  },
  data() {
    const checkEntryTime = (rule, value, callback) => {
      if (this.addEmployeesForm.correctionTime) {
        const EntryTime = value.getTime()
        const BecomeTime = this.addEmployeesForm.correctionTime.getTime()
        BecomeTime - EntryTime >= 0 ? callback() : callback(new Error('入职时间不能超过转正时间'))
      } else {
        callback()
      }
    }
    const checkBecomeTime = (rule, value, callback) => {
      if (this.addEmployeesForm.timeOfEntry) {
        const EntryTime = this.addEmployeesForm.timeOfEntry.getTime()
        const BecomeTime = value.getTime()
        BecomeTime - EntryTime >= 0 ? callback() : callback(new Error('转正时间不能小于入职时间'))
      } else {
        callback()
      }
    }
    return {
      constant,
      cardLoading: false,
      treeStatus: false,
      dialogVisible: false,
      employeesList: [],
      departmentList: [],
      page: {
        page: 1,
        size: 5,
        total: null
      },
      addEmployeesForm: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间不能为空', trigger: 'blur' }, { validator: checkEntryTime }],
        correctionTime: [{ required: true, message: '转正时间不能为空', trigger: 'blur' }, { validator: checkBecomeTime }]
      }
    }
  },
  created() {
    this.applyData()
  },
  methods: {
    async applyData() {
      this.cardLoading = true
      const res = await getEmployeesList(this.page)
      this.cardLoading = false
      this.employeesList = res.data.rows.map(item => {
        item.formOfEmployment && (item.formOfEmployment = parseInt(item.formOfEmployment))
        return item
      })
      this.page.total = res.data.total
    },
    // 添加员工
    async addEmployees() {
      try {
        await this.$refs.addEmployeesForm.validate()
        await addEmployees(this.addEmployeesForm)
        this.applyData()
        this.dialogVisible = false
        this.$message.success('添加成功')
      } catch (err) {
        console.log(err)
      }
    },
    // 删除员工
    async delEmployees(id) {
      try {
        await delEmployeesList(id)
        this.applyData()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
      }
    },
    currentPageIndex(pageIndex) {
      this.page.page = pageIndex
      this.applyData()
    },
    currentSizes(pageSize) {
      this.page.size = pageSize
      this.applyData()
    },
    // table表格列中的格式化数据
    formOfEmploymentFormatter(row, column, cellValue, index) {
      if (typeof cellValue === 'number') {
        return constant.hireType.find(item => item.id === cellValue).value
      } else {
        return cellValue
      }
    },
    checkTwoTime() {
      if (this.addEmployeesForm.correctionTime && this.addEmployeesForm.timeOfEntry) {
        this.$refs.addEmployeesForm.validateField(['timeOfEntry', 'correctionTime'])
      }
    },
    // dialog关闭动画执行
    dialogClose() {
      this.treeStatus = false
      this.$refs.addEmployeesForm.resetFields()
    },
    // 获取部门列表
    async getDepartmentName() {
      this.treeStatus = true
      const res = await getDepartmentList()
      this.departmentList = digui(res.data.depts)
    },
    // 获取当前点击的节点名称
    getTreeName(data) {
      this.addEmployeesForm.departmentName = data.name
      this.treeStatus = false
    },
    // 导出Execel
    async deriveExecel() {
      const header = ['序号', '姓名', '工号', '聘用形式', '部门', '入职日期', '账户状态']
      const res = await getEmployeesList({
        page: 1,
        size: this.page.total
      })
      const data = res.data.rows.map((item, index) => {
        const formOfEmployment = constant.hireType.find(item2 => item2.id === item.formOfEmployment)
        const enableState = item.enableState === 1 ? '激活' : '未激活'
        const timeOfEntry = item.timeOfEntry.split('T')[0]
        return [
          index + 1,
          item.username,
          item.workNumber,
          formOfEmployment ? formOfEmployment.value : formOfEmployment,
          item.departmentName,
          timeOfEntry,
          enableState
        ]
      })
      const excel = await import('@/components/Export2Exel')
      excel.export_json_to_excel({
        header,
        data,
        filename: '所有员工列表', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      })
    },
    showErweima(url) {
      if (url) {
        this.$refs.erweima.dialogVisible = true
        this.$refs.erweima.imgUrl = url
      } else {
        this.$message.error('当前用户没有头像')
      }
    },
    async editRole(userId) {
      await this.$refs.editRole.getUserDetailById(userId)
      this.$refs.editRole.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.departmentBox {
    position: absolute;
    top: 45px;
    left: 0;
    width: 396px;
    border: 1px solid #888;
    border-radius: 6px;
    z-index: 888;
    overflow: hidden;
    .departmentList {
        overflow: auto;
        width: 420px;
        height: 200px;
    }
}
.userImg {
  width: 100%;
  height: 100%;
  text-align: center;
  img {
    object-fit: cover;
    height:100px;
    width:100px;
    border-radius: 50%;
  }
}
</style>
