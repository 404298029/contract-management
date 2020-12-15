<template>
  <div class="app-container">
    <el-form
      ref="areaFilter"
      label-position="left"
      class="fillerForm"
      label-width="100px"
      :model="areaQuery"
    >
      <el-row :gutter="24">
        <el-col :xs="12" :sm="8" :lg="6">
          <el-form-item label="区域名">

            <el-input
              v-model="areaQuery.areaName"
              placeholder="请输入"
              clearable
              list-query
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
        </el-col>
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
      v-loading="areaQueryLoading"
      :data="areaList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="index" width="40" align="center" />
      <el-table-column label="区域名" prop="areaName" align="center" />
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
      :page.sync="areaQuery.current"
      :limit.sync="areaQuery.size"
      @pagination="queryAreaList"
    />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" center width="50%">
      <el-form ref="areaForm" :rules="rules" label-width="100px" :model="areaForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="区域名">
              <el-input v-model="areaForm.areaName" />
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
  getAreaPage,
  addAreaObj,
  updateAreaObj,
  delAreaObj
} from '@/api/sale/area'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Area',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      areaList: null,
      areaForm: {
        areaName: ''
      },
      total: 0,
      areaLoading: true,
      areaQuery: {
        current: 1,
        size: 10,
        areaName: ''
      },
      rules: {
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      }
    }
  },
  created() {
    this.queryAreaList()
  },
  methods: {
    handler() {
      this.areaQuery = { areaName: '' }
    },
    queryAreaList() {
      this.areaQueryLoading = true
      getAreaPage(this.areaQuery).then(res => {
        this.areaList = res.data.records
        this.total = res.data.total
        this.areaQueryLoading = false
      })
    },
    handleFilter() {
      // this.customerQuery.current = 1
      this.queryAreaList()
    },
    resetAreaForm() {
      this.areaForm = {
        areaName: ''
      }
    },
    handleCreate() {
      this.resetAreaForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['areaForm'].resetFields()
      })
    },
    createData() {
      this.$refs['areaForm'].validate(valid => {
        if (valid) {
          addAreaObj(this.areaForm).then(() => {
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
      this.areaForm = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['areaForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['areaForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.areaForm)
          updateAreaObj(tempData).then(() => {
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
          delAreaObj(row.id).then(() => {
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
