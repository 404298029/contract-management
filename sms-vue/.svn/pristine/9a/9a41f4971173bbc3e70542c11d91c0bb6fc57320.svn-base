<template>
  <div class="app-container">
    <el-form
      ref="contractFilter"
      label-position="left"
      class="fillerForm"
      label-width="100px"
      :model="listQuery"
    >
      <el-row :gutter="24">
        <el-col :xs="12" :sm="8" :lg="6">
          <el-form-item label="区域">
            <el-select
              v-model="listQuery.areaId"
              placeholder="请选择"
              clearable
              filterable
              @change="handleFilter"
            >
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :label="item.areaName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="6">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="listQuery.contractStartDate"
              list-query
              value-format="yyyy-MM-dd"
              type="date"
              clearable
              placeholder="请选择"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="6">
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="listQuery.contractEndDate"
              list-query
              value-format="yyyy-MM-dd"
              type="date"
              clearable
              placeholder="请选择"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="6">
          <el-form-item label="项目名称">
            <el-input
              v-model="listQuery.projectName"
              placeholder="请输入"
              list-query
              clearable
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="6">
          <el-form-item label="签订单位">
            <el-input
              v-model="listQuery.customerName"
              placeholder="请输入"
              list-query
              clearable
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="6">
          <el-form-item label="负责人">
            <el-input
              v-model="listQuery.projectLeader"
              placeholder="请输入"
              clearable
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="6">
          <el-form-item label="序号">
            <el-input
              v-model="listQuery.serialNum"
              placeholder="请输入"
              clearable
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6">
          <el-form-item style="margin-left: -100px">
            <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
            <el-button v-waves type="primary" @click="chongzhi">重置</el-button>
            <el-button v-waves :loading="downloadLoading" type="primary" @click="handleDownload">导出</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="margin-bottom:15px" :gutter="20">
      <el-col :xs="12" :sm="10" :lg="8">
        <el-button
          type="primary"
          icon="el-icon-folder-add"
          @click="handleCreate"
        >添加</el-button>
        <el-button
          style="margin-right: 10px"
          type="primary"
          icon="el-icon-folder-add"
          :loading="templateDownLoading"
          @click="exceltemplate"
        >下载Excel模版</el-button>
        <el-upload
          ref="excelUpload"
          style="display: inline-block"
          action
          class="upload-demo"
          :http-request="handleExcelIn"
          accept=".xlsx"
          multiple
          :show-file-list="false"
          :limit="3"
          @on-change="uploadClear"
        >
          <el-button type="primary" :loading="upLoading" icon="el-icon-upload">导入Excel</el-button>
        </el-upload>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="16">
        <h4 style="display:inline;line-height:30px;color:red">
          <router-link
            v-if="info1>0"
            style="text-decoration:underline"
            to="/sale/excle"
          >共有{{ info1 }}条数据存在问题,请及时处理</router-link>
        </h4>
      </el-col>
    </el-row>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="contractList"
      :header-cell-style="tableHeaderColor"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="index" width="40" align="center" />
      <el-table-column label="序号" prop="serialNum" align="center" width="80" />
      <el-table-column label="项目名称" prop="projectName" width="300px" align="center" />
      <el-table-column label="签订单位" prop="customerName" min-width="200px" align="center" />
      <el-table-column label="合同时间" prop="contractDate" width="110px" align="center" sortable />

      <el-table-column label="金额" prop="contractMoney" width="110px" align="center" sortable />
      <el-table-column label="区域" width="110px" prop="areaName" align="center" />

      <el-table-column label="牵头人" width="80px" prop="projectLeader" align="center" />
      <el-table-column label="贡献比例" prop="leaderProportion" align="center" width="100" />
      <el-table-column label="执行人" width="80px" prop="projectExecutor" align="center" />
      <el-table-column label="贡献比例" prop="executorProportion" align="center" width="100" />
      <el-table-column
        label="操作"
        align="center"
        width="180"
        fixed="right"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-button icon="el-icon-edit" type="warning" size="mini" @click="handleUpdate(row)" />
          <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row)" />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="getContractList"
    />
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      center
      width="50%"
      top="10vh"
    >
      <el-form ref="contractForm" :rules="rules" label-width="100px" :model="contractForm">
        <el-row>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="序号" prop="serialNum">
              <el-input v-model="contractForm.serialNum" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="项目简称" prop="projectName">
              <el-input v-model="contractForm.projectName" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="签订单位" prop="customerName">
              <el-select
                style="width: 100%"
                v-model="contractForm.customerName"
                filterable
                remote
                reserve-keyword
                placeholder="请输入单位关键词"
                :remote-method="queryCustomeLikeList"
                :loading="false">
                <el-option
                  v-for="item in customeList"
                  :key="item.id"
                  :label="item.customerName"
                  :value="item.id"
                  @click.native="selectCustome(item.customerName)"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="金额(元)" prop="contractMoney">
              <el-input min="0" v-model="contractForm.contractMoney" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="合同时间" prop="contractDate">
              <el-date-picker
                v-model="contractForm.contractDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="区域" prop="areaId">
              <el-select v-model="contractForm.areaId" filterable style="width: 100%">
                <el-option
                  v-for="item in areaList"
                  placeholder="请选择"
                  :key="item.id"
                  :label="item.areaName"
                  :value="item.id"
                  @click.native="selectArea(item.areaName)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="负责人" prop="projectLeader">
              <el-input v-model="contractForm.projectLeader" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="贡献占比">
              <el-input v-model="contractForm.leaderProportion" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="执行人">
              <el-input v-model="contractForm.projectExecutor" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="贡献占比">
              <el-input v-model="contractForm.executorProportion" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='添加'?createData('contractForm'):updateData()"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getContractList,
  addContractObj,
  updateContractObj,
  delContractObj,
  getnotUnStandCount
} from '@/api/sale/contract'
import { getCustomerLike } from '@/api/sale/customer'
import { getAreaList } from '@/api/sale/area'
import { exportExcleContract, excelupload, exceltemplate } from '@/api/sale/contract'
import { dowloadexcel } from '@/utils/file'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Contract',
  components: { Pagination },
  directives: { waves },

  data() {
     var validateMoney = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入金额'));
        } else {
          if (Number(value)<0) {
            callback(new Error('金额不能为负'));
          }
          callback();
        }
      };
    return {
      info1: '',
      upLoading: false,
      tableKey: 0,
      contractList: null,
      contractForm: {
        areaCode: '',
        areaName: '',
        areaId: '',
        contractDate: '',
        contractMoney: '',
        customerName: '',
        customerId: '',
        executorProportion: '',
        leaderProportion: '',
        projectExecutor: '',
        projectLeader: '',
        projectName: '',
        serialNum: ''
      },
      total: 0,
      listLoading: true,
      areaList: [],
      areaList1: [],
      listQuery: {
        current: 1,
        size: 10,
        projectName: '',
        customerName: '',
        areaId: '',
        projectLeader: '',
        serialNum: '',
        contractStartDate: '',
        contractEndDate: ''
      },

      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        编辑: '编辑',
        添加: '添加'
      },
      rules: {
        serialNum: [{ required: true, message: '请输入序号', trigger: 'blur' }],
        projectName: [
          { required: true, message: '请输入项目简称', trigger: 'blur' }
        ],
        customerName: [
          { required: true, message: '请输入签订单位', trigger: 'blur' }
        ],
        contractMoney: [
          { required: true, validator: validateMoney, trigger: 'blur' }
        ],
        contractDate: [
          { required: true, message: '请输入合同时间', trigger: 'blur' }
        ],
        areaId: [{ required: true, message: '请选择区域', trigger: 'blur' }],
        projectLeader: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ]
      },
      downloadLoading: false,
      templateDownLoading: false,
      customeList: []
    }
  },
  created() {
    this.getContractList()
    this.getAreaList()
    this.getnotUnStandCount()
  },
  methods: {
    //设置表头行的样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return "background:#f3f3f3e0;color:#606266;font-size:10px;text-align:center";
    },
    selectArea(areaName) {
      this.contractForm.areaName = areaName
    },
    selectCustome(customerName) {
      this.contractForm.customerName = customerName
    },
    exceltemplate() {
      this.templateDownLoading = true
      exceltemplate().then(res => {
        this.templateDownLoading = false
        dowloadexcel(res)
      })
    },
    getnotUnStandCount() {
      getnotUnStandCount().then(res => {
        this.info1 = res.data
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    uploadClear() {
      this.$refs['excelUpload'].clearFiles()
    },
    handleExcelIn(param) {
      this.upLoading = true
      excelupload(param.file).then(res => {
        this.$notify({
          title: 'Success',
          message: res.msg,
          type: 'success',
          duration: 2000
        })
        this.getnotUnStandCount()
        this.getContractList()
        this.getAreaList()
      })
        this.upLoading = false
    },
    queryCustomeLikeList(queryString) {
      if (!queryString == '') {
        getCustomerLike(queryString).then(res => {
          this.customeList = res.data
        })
      }
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    queryAreas(queryString, cb) {
      var data = this.areaList
      for (const i of data) {
        i.value = i.areaName
      }
      var results = queryString
        ? data.filter(this.createStateFilter(queryString))
        : data
      cb(results)
    },
    getAreaList() {
      getAreaList().then(res => {
        this.areaList = res.data
      })
    },
    getContractList() {
      this.listLoading = true
      getContractList(this.listQuery).then(res => {
        this.contractList = res.data.records
        this.total = res.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getContractList()
    },
    resetContractForm() {
      this.contractForm = {
        areaCode: '',
        areaName: '',
        contractDate: '',
        contractMoney: '',
        customerName: '',
        executorProportion: '',
        leaderProportion: '',
        projectExecutor: '',
        projectLeader: '',
        projectName: '',
        serialNum: ''
      }
    },
    chongzhi() {
      this.listQuery = {
        areaId: '',
        contractStartDate: '',
        contractEndDate: '',
        projectName: '',
        customerName: '',
        projectLeader: '',
        serialNum: ''
      }
    },
    handleCreate() {
      this.resetContractForm()
      this.dialogStatus = '添加'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['contractForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['contractForm'].validate(valid => {
        if (valid) {
          addContractObj(this.contractForm).then(() => {
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
      console.log(row);
      this.contractForm = Object.assign({}, row) // copy obj
      this.dialogStatus = '编辑'
      this.dialogFormVisible = true
      this.contractForm.customerId=row.customerId
      this.$nextTick(() => {
        this.$refs['contractForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['contractForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.contractForm)
          updateContractObj(tempData).then(() => {
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
          delContractObj(row.id).then(() => {
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
    },
    handleDownload() {
      this.downloadLoading = true
      exportExcleContract(this.listQuery).then(res => {
        this.downloadLoading = false
        dowloadexcel(res)
      })
    }
  }
}
</script>
<style scoped>
</style>
