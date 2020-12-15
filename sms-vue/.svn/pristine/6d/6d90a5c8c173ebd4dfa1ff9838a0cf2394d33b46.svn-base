<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="listQuery.startYear"
          list-query
          value-format="yyyy"
          type="year"
          style="width: 150px"
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="listQuery.endYear"
          list-query
          value-format="yyyy"
          type="year"
          style="width: 150px"
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label="区域">
        <el-select v-model="listQuery.areaId" placeholder="请选择" clearable style="width: 100px" @change="handleFilter">
          <el-option v-for="item in areaList" :key="item.id" :label="item.areaName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目负责人">
        <el-input v-model="listQuery.projectLeader" placeholder="请输入" style="width: 100px;" @keyup.enter.native="handleFilter" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleFilter">确定</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="fas" @click="handleDownload">导出</el-button>
      </el-form-item>
    </el-form>
    <panel-group
      :count-contracts="countNum.countContracts"
      :count-money="countNum.countMoney"
      :count-area="countNum.countArea"
      :count-project-leader="countNum.countProjectLeader"
      @handleSetLineChartData="handleSetLineChartData"
    />
    <el-alert
      type="info"
      center
      :closable="false"
    >
      <span style="font-size: medium;color: black">销售金额统计</span>
    </el-alert>
    <div class="">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="16">
          <bar-chart
            height="500px"
            width="100%"
            :chart-data="yearMoney"
            name="金额"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <pie-chart
            hight="300px"
            width="100%"
            :chart-data="areaMoney"
            name="各区域金额占比"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import PanelGroup from '../../../components/Charts/PanelGroup'
import BarChart from '../../../components/Charts/BarChart'
import PieChart from '../../../components/Charts/PieChart'
import { dowloadexcel } from '@/utils/file'
import { exportExcleStatistics } from '@/api/sale/statistics'
import { getAreaList } from '@/api/sale/area'
import { saleStatistics } from '@/api/sale/statistics'

export default {
  name: 'SaleStatistics',
  components: {
    PanelGroup,
    BarChart,
    PieChart
  },
  data() {
    return {
      fas: false,
      areaList: [],
      title: '',
      listQuery: {
        areaId: '',
        projectLeader: '',
        startYear: '',
        endYear: ''
      },
      countNum: {},
      areaMoney: {},
      yearMoney: {}
    }
  },
  created() {
    this.getAreaList()
    this.getStatistics()
  },
  methods: {
    handleFilter() {
      this.getStatistics()
    },
    getAreaList() {
      getAreaList().then(res => {
        this.areaList = res.data
      })
    },
    getStatistics() {
      saleStatistics(this.listQuery).then(res => {
        this.countNum = res.data.countNum
        this.areaMoney = res.data.areaMoney
        this.yearMoney = res.data.yearMoney
      })
    },
    handleSetLineChartData(type) {
    },
    handleDownload() {
      this.fas = true
      exportExcleStatistics(this.listQuery).then(res => {
        dowloadexcel(res)
        this.fas = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-collapse-item__content {
    padding-bottom: 5px;
  }
  .chart-container{
    position: relative;
    width: 100%;
    /*height: calc(100vh - 84px);*/
  }
  .color{
    background-color: #344b58;
    width: 100%;
    height: 100%;
    position: fixed;
  }
</style>
