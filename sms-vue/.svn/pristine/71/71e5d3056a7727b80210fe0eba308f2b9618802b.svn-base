<template>
  <div class="dashboard-h app-container">
    <div class="dashboard-flex">
      <div class="dashboard-h-1">
        <echart :chart-data="chartData" :json-data="jsonData" />
      </div>
      <div class="dashboard-h-2">
        <div class="dashboard-h-3">
          <bar :bar-data="barData" />
        </div>
        <div class="dashboard-h-4">
          <lines :line-data="lineData" />
        </div>
      </div>
    </div>
    <div class="dashboard-h-5">
      <list :table-data="tableData" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echart from '../../components/Charts/indexChart/echart'
import Bar from '../../components/Charts/indexChart/Bar'
import Lines from '../../components/Charts/indexChart/Lines'
import list from '../../components/Charts/indexChart/Table'
import { homeTableList } from '@/api/homepage/table'

export default {
  name: 'Dashboard',
  components: {
    echart,
    Bar,
    Lines,
    list
  },
  data() {
    return {
      chartData: [],
      jsonData: {},
      barData: {},
      lineData: {},
      tableData: []
    }
  },
  created() {
    this.homeTableList()
  },
  methods: {
    homeTableList() {
      homeTableList().then((res) => {
        this.chartData = res.data.map
        this.tableData = res.data.table
        this.barData = res.data.sale
        this.lineData = res.data
      })
    }
  },
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style scoped>
.dashboard-container {
  margin: 30px;
}

.dashboard-flex {
  display: flex;
  justify-content: space-between;
  height: 50vh;
}

.dashboard-h-5 {
  height: 36vh;
  width: 100%;
}

.dashboard-h-1 {
  height: 100%;
  width: 60%;
  margin-right: 10px;
  /* background: #304156d4; */
}

.dashboard-h-2 {
  height: 100%;
  width: 40%;
  /* background: #304156d4; */
}

.dashboard-h-3 {
  height: 48%;
  width: 100%;
  margin: 1% 0;
  /* background: rgb(121, 189, 127); */
}

.dashboard-h-4 {
  height: 48%;
  width: 100%;
  margin: 1% 0;
  /* background: rgb(175, 109, 159); */
}

.dashboard-h {
  height: calc(100vh - 84px);
  /* background: rgb(81, 80, 143); */
  overflow: auto;
}
</style>
