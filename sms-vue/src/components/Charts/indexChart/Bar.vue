<template>
  <div id="indexbar" style="width: 100%; height: 100%; cursor: pointer"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    barData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      chartBar: null,
      lastYear: [],
      thisYear: [],
      month: [],
    };
  },
  methods: {
    chartinit() {
      this.chartBar = echarts.init(document.getElementById("indexbar"));
    },
    setOptions(obj) {
      var that = this.chartBar;
      var option = {
        backgroundColor: "",
        title: {
          text: "",
          left: "center",
          textStyle: {
            color: "#000",
            fontSize: 15,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            return (
              params[0].axisValue +
              "月<br>" +
              params[0].seriesName +
              "年 : " +
              params[0].value +
              "元" +
              "<br>" +
              params[1].seriesName +
              "年 : " +
              params[1].value +
              "元"
            );
          },
        },
        grid: {
          top: "12%",
          left: "1%",
          right: "1%",
          bottom: "8%",
          containLabel: true,
        },
        // legend: {
        //   itemGap: 20,
        //   right: "2%",
        //   top: "2%",
        //   data: ["本周进口量", "上周进口量", "周计划量"],
        // },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: false,
              lineStyle: {
                color: "#f9f9f9",
              },
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "#000",
                // margin: 15,
              },
            },
            axisTick: {
              show: false,
            },
            data: [],
          },
        ],
        yAxis: [
          {
            name: "",
            type: "value",
            min: 0,
            splitNumber: 7,
            splitLine: {
              //   show: true,
              lineStyle: {
                color: "#e6e5e5",
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              //   margin: 20,
              textStyle: {
                color: "#000",
              },
              //   formatter: function (value, index) {
              //     return value.toFixed(1);
              //   },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "去年销售额",
            type: "bar",
            // barWidth: 30,
            // barGap: "0%",
            color: "#79A1B5",
            // label: {
            //   show: true,
            //   position: "top",
            //   textStyle: {
            //     color: "#000",
            //   },
            // },
            itemStyle: {
              normal: {
                barBorderRadius: 3,
              },
            },
            data: [],
          },
          {
            name: "今年销售额",
            type: "bar",
            // barWidth: 30,
            color: "#F3EB00",
            // label: {
            //   show: true,
            //   position: "top",
            //   textStyle: {
            //     color: "#A39B00",
            //   },
            // },
            itemStyle: {
              normal: {
                barBorderRadius: 3,
              },
            },
            data: [],
          },
        ],
      };
      that.setOption(option);
      window.addEventListener("resize", function () {
        that.resize();
      });
      option.series[0].data = obj.seriesDataList[1].dataList;
      option.series[1].data = obj.seriesDataList[0].dataList;
      option.series[0].name = obj.seriesDataList[1].name;
      option.series[1].name = obj.seriesDataList[0].name;
      option.xAxis[0].data = obj.xaxisData;
      option.title.text = obj.seriesDataList[0].name + "年比去年销售额对比";
      that.setOption(option, true);
    },
  },
  watch: {
    barData: {
      deep: true,
      handler(obj) {
        this.chartinit();
        this.setOptions(obj);
      },
    },
  },
};
</script>

<style>
</style>