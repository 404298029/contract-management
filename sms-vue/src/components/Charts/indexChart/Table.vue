<template>
  <div class="list-table">
    <div class="list-1">2020年订单销售数据排行榜</div>
    <el-table
      :data="tableData"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
      border
    >
      <el-table-column prop="areaId" label="订单序号"> </el-table-column>
      <el-table-column prop="projectName" label="项目简称"> </el-table-column>
      <el-table-column prop="customerName" label="签订单位"> </el-table-column>
      <el-table-column prop="contractDate" label="合同时间"> </el-table-column>
      <el-table-column prop="contractMoney" label="金额(元)"> </el-table-column>
      <el-table-column prop="areaName" label="区域"> </el-table-column>
      <el-table-column prop="leaderProportion" label="贡献占比">
      </el-table-column>
      <el-table-column prop="projectLeader" label="负责人"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  created() {},
  methods: {
    tableRowStyle({ row, rowIndex }) {
      // return "background-color:#000;";
      return {
        // "background":'#304156d4',
        // "color":'#000'
      }
    },
    //设置表头行的样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return "background:#f3f3f3e0;color:#000;font-wight:500;font-size:15px;text-align:center";
    }, 
  },
};
</script>
<style  scoped>
.list-1 {
  text-align: center;
  padding: 10px;
  font-weight: bold;
}
.list-table {
  width: 100%;
  height: 100%;
  cursor: pointer; 
}
</style>