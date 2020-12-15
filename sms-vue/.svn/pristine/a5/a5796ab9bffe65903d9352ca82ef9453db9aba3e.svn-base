<template>
  <div class="app-container">
    <el-form
      ref="customerFilter"
      label-position="left"
      class="fillerForm"
      label-width="100px"
      :model="customerQuery"
    >
      <el-row :gutter="24">
        <el-col :xs="12" :sm="8" :lg="6">
          <el-form-item label="客户公司名称">
            <el-input
              v-model="customerQuery.customerName"
              placeholder="请输入"
              clearable
              list-query
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="6">
          <el-form-item label="客户公司全称">
            <el-input
              v-model="customerQuery.customerFullName"
              placeholder="请输入"
              clearable
              list-query
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
        </el-col>
<!--        <el-col :xs="12" :sm="8" :lg="6">-->
<!--          <el-form-item label="地址">-->
<!--            <el-input-->
<!--              v-model="customerQuery.customerAddress"-->
<!--              placeholder="请输入"-->
<!--              list-query-->
<!--              @keyup.enter.native="handleFilter"-->
<!--            />-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :xs="12" :sm="8" :lg="6">-->
<!--          <el-form-item label="电话">-->
<!--            <el-input-->
<!--              v-model="customerQuery.customerPhone"-->
<!--              placeholder="请输入"-->
<!--              list-query-->
<!--              @keyup.enter.native="handleFilter"-->
<!--            />-->
<!--          </el-form-item>-->
<!--        </el-col>-->
        <el-col :xs="12" :sm="12" :lg="6">
          <el-form-item style="margin-left: -100px">
            <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
            <el-button v-waves type="primary" @click="handler">重置</el-button>
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
      v-loading="customerQueryLoading"
      :data="customerList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="index" width="40" align="center" />
      <el-table-column label="客户公司名称" prop="customerName" align="center" />
      <el-table-column label="客户公司全称" prop="customerFullName" align="center" />
      <el-table-column label="地址" prop="customerAddress" align="center" />
      <el-table-column label="电话" prop="customerPhone" align="center" />
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button icon="el-icon-edit" type="warning" size="mini" @click="handleUpdate(row)" />
          <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row)" />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="customerQuery.current"
      :limit.sync="customerQuery.size"
      @pagination="getCustomerList"
    />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" center width="50%">
      <el-form ref="customerForm" :rules="rules" label-width="100px" :model="customerForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户公司名称">
              <el-input v-model="customerForm.customerName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户公司全称">
              <el-input v-model="customerForm.customerFullName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址">
              <el-input v-model="customerForm.customerAddress" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话">
              <el-input v-model="customerForm.customerPhone" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCustomerList,
  addCustomerObj,
  updateCustomerObj,
  delCustomerObj
} from '@/api/sale/customer'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Customer',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      customerList: null,
      customerForm: {
        customerName: '',
        customerFullName: '',
        customerAddress: '',
        customerPhone: ''
      },
      total: 0,
      customerQueryLoading: true,
      customerQuery: {
        current: 1,
        size: 10,
        customerName: '',
        customerFullName: '',
        customerAddress: '',
        customerPhone: ''
      },

      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      rules: {}
    }
  },
  created() {
    this.getCustomerList()
  },
  methods: {
    handler() {
      this.customerQuery = {
        customerName: '',
        customerFullName: ''
      }
    },
    getCustomerList() {
      this.customerQueryLoading = true
      getCustomerList(this.customerQuery).then(res => {
        this.customerList = res.data.records
        this.total = res.data.total
        this.customerQueryLoading = false
      })
    },
    handleFilter() {
      // this.customerQuery.current = 1
      this.getCustomerList()
    },
    resetCustomerForm() {
      this.customerForm = {
        customerName: '',
        customerFullName: '',
        customerAddress: '',
        customerPhone: ''
      }
    },
    handleCreate() {
      this.resetCustomerForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['customerForm'].resetFields()
      })
    },
    createData() {
      var obj = this.customerForm
      if (obj.customerName == '') {
        this.$message({
          type: 'info',
          message: '客户公司名称不能为空'
        })
        return
      }
      if (obj.customerFullName == '') {
        this.$message({
          type: 'info',
          message: '客户公司全称不能为空'
        })
        return
      }
      this.$refs['customerForm'].validate(valid => {
        if (valid) {
          addCustomerObj(this.customerForm).then(() => {
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
      this.customerForm = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['customerForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['customerForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.customerForm)
          updateCustomerObj(tempData).then(() => {
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
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delCustomerObj(row.id).then(() => {
            this.$notify({
              title: 'Success',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        })
        .catch(() => {
          this.$notify({
            title: 'Delete failed',
            message: '取消删除',
            type: 'success',
            duration: 2000
          })
        })
    }
  }
}
</script>
