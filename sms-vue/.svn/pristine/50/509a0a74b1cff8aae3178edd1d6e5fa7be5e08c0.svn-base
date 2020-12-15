<template>
  <div class="app-container">
    <el-button type="primary" @click="back">
      <router-link to="/sale/contract">返回</router-link>
    </el-button>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="contractList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="index" width="40" align="center" />
      <el-table-column label="序号" prop="serialNum" align="center" width="80" />
      <el-table-column label="项目名称" prop="projectName" width="150px" align="center" />
      <el-table-column label="签订单位" prop="customerName" min-width="200px" />
      <el-table-column label="合同时间" prop="contractDate" width="110px" align="center" sortable>
        <template slot-scope="{row}">
          <span v-if="row.contractDate=='1990-01-01'" style="color:red">{{ row.contractDate }}</span>
          <span v-else>{{ row.contractDate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="金额" prop="contractMoney" width="110px" align="center" sortable />
      <el-table-column label="区域" width="110px" prop="areaName" align="center">
        <template slot-scope="{row}">
          <span v-if="row.areaName=='未知区域'" style="color:red">{{ row.areaName }}</span>
          <span v-else>{{ row.areaName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="牵头人" width="80px" prop="projectLeader" align="center" />
      <el-table-column label="贡献比例" prop="leaderProportion" align="center" width="100" />
      <el-table-column label="执行人" width="80px" prop="projectExecutor" align="center" />
      <el-table-column label="贡献比例" prop="executorProportion" align="center" width="100" />
      <el-table-column label="操作" align="center" fixed="right" width="180" class-name="small-padding fixed-width">
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
    <el-dialog :title="textMap" :visible.sync="dialogFormVisible" center width="50%" top="10vh">
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
              <el-input v-model="contractForm.customerName" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="金额" prop="contractMoney">
              <el-input v-model="contractForm.contractMoney" type="number" />
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
            <el-form-item label="区域" prop="areaName">
              <el-autocomplete
                v-model="contractForm.areaName"
                :fetch-suggestions="queryAreas"
                style="width: 100%"
              />
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
        <el-button type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getContractupde,
  updateContractObj,
  delContractObj
} from '@/api/sale/contract'
import { getAreaList } from '@/api/sale/area'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  components: { Pagination },
  data() {
    const get2 = (rule, value, cb) => {
      if (value == '未知区域') {
        cb(new Error('请选择正确的区域'))
      } else {
        cb()
      }
    }
    const get1 = (rule, value, cb) => {
      console.log(value)
      if (value == '1990-01-01') {
        cb(new Error('输入正确的时间'))
      } else {
        cb()
      }
    }
    return {
      total: 0,
      listQuery: {
        current: 1,
        size: 10
      },
      areaList: [],
      rules: {
        contractDate: [{ required: true, trigger: 'blur', validator: get1 }],
        areaName: [{ required: true, trigger: 'blur', validator: get2 }]
      },
      tableKey: 0,
      listLoading: false,
      textMap: '修改相关信息',
      contractList: [{ serialNum: 1 }],
      dialogFormVisible: false,
      contractForm: {
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
    }
  },
  created() {
    this.getContractList()
  },
  methods: {
    back() {
      this.$router.push('/sale/contract')
    },
    getContractList() {
      this.listLoading = true
      getContractupde(this.listQuery).then(res => {
        this.contractList = res.data.records
        this.total = res.data.total
        this.listLoading = false
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
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.getContractList()
          })
        })
        .catch(() => {})
    },
    getAreaList() {
      getAreaList().then(res => {
        this.areaList = res.data
      })
    },
    handleUpdate(row) {
      this.contractForm = Object.assign({}, row) // copy obj
      this.getAreaList()
      this.dialogFormVisible = true
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
            this.getContractList()
          })
        }
      })
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
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    }
  }
}
</script>

<style>
</style>
