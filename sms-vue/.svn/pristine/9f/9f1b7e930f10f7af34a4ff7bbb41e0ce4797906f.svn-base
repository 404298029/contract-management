<template>
  <div class="app-container">
    <el-form
      ref="userFilter"
      label-position="left"
      class="fillerForm"
      label-width="100px"
      :model="userQuery"
    >
      <el-row :gutter="24">
        <el-col :xs="12" :sm="8" :lg="6">
          <el-form-item label="用户名">
            <el-input
              v-model="userQuery.userName"
              placeholder="请输入"
              list-query
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6">
          <el-form-item style="margin-left: -100px">
            <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
            <el-button
              style="margin-left: 5px;"
              type="primary"
              icon="el-icon-folder-add"
              @click="handleCreate"
            >添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      v-loading="userQueryLoading"
      :data="userList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="index" width="40" align="center" />
      <el-table-column label="用户名" prop="userName" align="center" />
      <el-table-column label="角色" prop="roleName" align="center" />
      <el-table-column label="操作" align="center" width="280" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button icon="el-icon-edit" type="warning" size="mini" @click="handleUpdate(row)" />
          <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row)" />
          <el-button type="info" size="small" @click="restpass(row)">密码重置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="userQuery.current"
      :limit.sync="userQuery.size"
      @pagination="getUserList"
    />
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      center
      width="500px"
    >
      <el-form ref="userForm" :rules="rules" label-width="100px" :model="userForm">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" placeholder="用户名" />
        </el-form-item>
        <el-form-item v-show="fass" label="密码" prop="password">
          <el-input v-model="userForm.password" placeholder="默认123456" />
        </el-form-item>
        <el-form-item>
          <!-- <el-radio v-model="userForm.roleId" :label="1">超级管理员</el-radio> -->
          <el-radio v-model="userForm.roleId" :label="2">普通管理员</el-radio>
          <el-radio v-model="userForm.roleId" :label="3">普通用户</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <!--        <el-button @click="resetUserForm()">重置</el-button>-->
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  addUserObj,
  updateUserObj,
  delUserObj,
  restpass
} from '@/api/upms/user'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'User',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      fass: true,
      tableKey: 0,
      userList: null,
      userForm: {
        id: '',
        userName: '',
        roleId: '',
        password: ''
      },
      total: 0,
      userQueryLoading: true,
      userQuery: {
        current: 1,
        size: 10,
        userName: ''
      },
      roleList: null,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: false, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    restpass(row) {
      restpass(row.id).then(res => {
        this.$notify({
          title: 'Success',
          message: '重置成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    getUserList() {
      this.userQueryLoading = true
      getUserList(this.userQuery).then(res => {
        this.userList = res.data.records
        this.total = res.data.total
        this.userQueryLoading = false
      })
    },
    handleFilter() {
      this.userQuery.current = 1
      this.getUserList()
    },
    resetUserForm() {
      this.userForm = {
        id: '',
        userName: '',
        roleId: 3,
        password: ''
      }
    },
    handleCreate() {
      this.resetUserForm()
      this.fass = true
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['userForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['userForm'].validate(valid => {
        if (valid) {
          addUserObj(this.userForm).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
      })
    },
    handleUpdate(row) {
      this.fass = false
      this.userForm = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['userForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['userForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.userForm)
          updateUserObj(tempData).then(res => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
      })
    },
    handleDelete(row) {
      console.log(row)
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delUserObj(row.id).then(() => {
            this.$notify({
              title: 'Success',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        })
        .catch(() => {})
    }
  }
}
</script>
