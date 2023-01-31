<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button icon="el-icon-plus" size="small" type="primary" @click="popupDialog('新增角色')">新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="tableData" border="">
              <el-table-column label="序号" width="120">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="success"
                    @click="allotPermission(scope.row.name, scope.row.id)"
                  >分配权限</el-button>
                  <el-button size="small" type="primary" @click="popupDialog('编辑角色', scope.row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                :page-sizes="[2, 3, 5, 10]"
                :page-size="pages.pagesize"
                :total="total"
                layout="sizes,prev,pager,next,total"
                @size-change="sizeChange"
                @current-change="currentChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改" type="info" show-icon :closable="false" />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input :value="companyInfo.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input :value="companyInfo.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input :value="companyInfo.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input :value="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog
        :close-on-click-modal="false"
        :title="currentStatusText"
        :visible.sync="isShow"
        width="45%"
        @closed="dialogShow"
      >
        <el-form ref="roleForm" :rules="RoleRules" :model="addRoleData">
          <el-form-item prop="name" label-width="80px" label="角色名称">
            <el-input v-model.trim="addRoleData.name" placeholder="请输入2-12位角色名称" />
          </el-form-item>
          <el-form-item prop="description" label-width="80px" label="角色描述">
            <el-input v-model.trim="addRoleData.description" placeholder="请输入2-100位角色描述" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="aa">
          <el-button type="primary" @click="addRole">确 定</el-button>
          <el-button @click="isShow = false">取 消</el-button>
        </span>
      </el-dialog>
      <allot-permission-dialog ref="allotPermissionDialog" />
    </div>
  </div>
</template>

<script>
import { getAllRoleList, getCompanyInfo, addRole, delRole, getRoleDetail, editRole } from '@/api/setting'
import { mapGetters } from 'vuex'
import allotPermissionDialog from './components/allotPermissionDialog.vue'
export default {
  components: {
    allotPermissionDialog
  },
  data() {
    return {
      isShow: false,
      currentStatusText: '',
      activeName: 'role',
      tableData: [],
      companyInfo: {},
      pages: {
        page: 1,
        pagesize: 10
      },
      total: 10,
      addRoleData: {
        name: '',
        description: ''
      },
      RoleRules: {
        name: [
          { trigger: 'blur', required: true, message: '角色名称不能为空' },
          { trigger: 'blur', min: 2, max: 12, message: '角色名称只允许2-12位字符' }
        ],
        description: [
          { trigger: 'blur', required: true, message: '角色描述不能为空' },
          { trigger: 'blur', min: 2, max: 100, message: '角色描述只允许2-100位字符' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['status', 'userInfo'])
  },
  watch: {
    status: {
      immediate: true, // 表示页面渲染完就会立即加载当前函数 并监听
      handler(val) {
        if (val) {
          getCompanyInfo(this.userInfo.companyId).then(res => {
            this.companyInfo = res.data
          })
        }
      }
    }
  },
  created() {
    this.applyData()
  },
  methods: {
    // 渲染页面数据
    async applyData() {
      const res = await getAllRoleList(this.pages)
      this.tableData = res.data.rows
      this.total = res.data.total
    },
    currentChange(page) {
      this.pages.page = page
      this.applyData()
    },
    sizeChange(pagesize) {
      this.pages.pagesize = pagesize
      this.applyData()
    },
    // 新增角色或编辑角色
    async addRole() {
      if (this.currentStatusText === '编辑角色') {
        try {
          await this.$refs.roleForm.validate()
          await editRole(this.addRoleData)
          this.applyData()
          this.$message.success('编辑成功')
          this.isShow = false
        } catch (err) {
          console.log(err)
        }
      } else if (this.currentStatusText === '新增角色') {
        try {
          await this.$refs.roleForm.validate()
          await addRole(this.addRoleData)
          this.applyData()
          this.$message.success('添加成功')
          this.isShow = false
        } catch (err) {
          console.log(err)
        }
      }
    },
    // 删除角色
    async delRole(id) {
      try {
        await this.$confirm('确定要删除当前角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delRole(id)
        await this.applyData()
        this.$message.success('删除成功')
      } catch (err) {
        if (err === 'cancel') {
          this.$message.info('已取消删除')
        }
      }
    },
    // 关闭dialog动画结束后执行
    dialogShow() {
      this.addRoleData = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
    },
    // 弹出并改变Dialog标题
    async popupDialog(status, roleId) {
      this.isShow = true
      this.currentStatusText = status
      if (status === '编辑角色') {
        const res = await getRoleDetail(roleId)
        this.addRoleData = res.data
      }
    },
    allotPermission(name, roleId) {
      this.$refs.allotPermissionDialog.showDialog(name, roleId)
    }
  }
}
</script>

<style lang="scss" scoped>
.aa {
  display: flex;
  justify-content: center;
}
</style>
