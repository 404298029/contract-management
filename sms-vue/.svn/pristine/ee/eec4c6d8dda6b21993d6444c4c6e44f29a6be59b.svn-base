<template>
  <div
    :id="id"
    class="index-icon"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import echarts from "echarts";
import china from "./china.json";
import { getAreaList } from "@/api/sale/area";
import { getJsonData } from "./json/jsonData";

echarts.registerMap("china", china);
export default {
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "indexechart",
    },
    width: {
      type: String,
      default: "98%",
    },
    height: {
      type: String,
      default: "48vh",
    },
    chartData: {
      type: [Array, Object],
    },
  },
  data() {
    return {
      chart: null,
      geoCoordMap: {
        // 武汉: [114.298572, 30.584355],
        // 成都: [103.9526, 30.7617],
        // 天津: [117.4219, 39.4189],
        // 西安: [108.948024, 34.263161],
        // 沈阳: [123.429096, 41.796767],
        // 济南: [117.000923, 36.675807],
      },
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(Arr) {
        this.setOptions(Arr);
      },
    },
  },
  created() {
    this.getAreaList();
  },
  mounted() {
    this.initChart();
  },
  methods: {
    getAreaList() {
      var that = this;
      getAreaList().then((res) => {
        res.data.map(function (value, el, arr) {
          that.geoCoordMap[value.areaName] = [];
        });
        var data = getJsonData();
        var obj = that.geoCoordMap;
        for (var key in obj) {
          obj[key] = data[key];
        }
      });
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
    },
    setOptions(Arr) {
      var thats = this;
      var that = this.chart;
      var citys = Arr.citys;
      var colors = [
        [
          "#1DE9B6",
          "#F46E36",
          "#04B9FF",
          "#5DBD32",
          "#FFC809",
          "#FB95D5",
          "#BDA29A",
          "#6E7074",
          "#546570",
          "#C4CCD3",
        ],
        [
          "#37A2DA",
          "#67E0E3",
          "#32C5E9",
          "#9FE6B8",
          "#FFDB5C",
          "#FF9F7F",
          "#FB7293",
          "#E062AE",
          "#E690D1",
          "#E7BCF3",
          "#9D96F5",
          "#8378EA",
          "#8378EA",
        ],
        [
          "#DD6B66",
          "#759AA0",
          "#E69D87",
          "#8DC1A9",
          "#EA7E53",
          "#EEDD78",
          "#73A373",
          "#73B9BC",
          "#7289AB",
          "#91CA8C",
          "#F49F42",
        ],
      ];
      var colorIndex = 0;
      var year = Arr.years;
      var barData = [];
      var categoryData = [];
      // eslint-disable-next-line no-unused-vars,no-array-constructor
      var mapData = [];
      // eslint-disable-next-line no-array-constructor
      var yearArry = Arr.years;
      for (let i = 0; i < yearArry.length; i++) {
        var cityArr = citys[i];
        var mapValueData = [];
        for (let j = 0; j < cityArr.length; j++) {
          var valuedata = cityArr[j];
          var mapNameVakueData = {
            year: yearArry[i],
            name: valuedata.name,
            value: valuedata.value,
          };
          mapValueData.push(mapNameVakueData);
        }
        mapData.push(mapValueData);
      }
      for (var i = 0; i < mapData.length; i++) {
        mapData[i].sort(function sortNumber(a, b) {
          return a.value - b.value;
        });
        barData.push([]);
        categoryData.push([]);
        for (var j = 0; j < mapData[i].length; j++) {
          barData[i].push(mapData[i][j].value);
          categoryData[i].push(mapData[i][j].name);
        }
      }
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = thats.geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };
      var optionXyMap01 = {
        timeline: {
          data: year,
          axisType: "category",
          autoPlay: true,
          playInterval: 5000,
          left: "10%",
          right: "10%",
          bottom: "3%",
          // top:'',
          width: "75%",
          label: {
            normal: {
              textStyle: {
                color: "#000",
              },
            },
            emphasis: {
              textStyle: {
                color: "#000",
              },
            },
          },
          symbolSize: 10,
          lineStyle: {
            color: "#555",
          },
          checkpointStyle: {
            borderColor: "#777",
            borderWidth: 2,
          },
          controlStyle: {
            showNextBtn: true,
            showPrevBtn: true,
            normal: {
              color: "#666",
              borderColor: "#666",
            },
            emphasis: {
              color: "#aaa",
              borderColor: "#aaa",
            },
          },
        },
        baseOption: {
          animation: true,
          animationDuration: 1000,
          animationEasing: "cubicInOut",
          animationDurationUpdate: 1000,
          animationEasingUpdate: "cubicInOut",
          grid: {
            right: "5%",
            top: "10%",
            bottom: "15%",
            width: "20%",
          },
          tooltip: {
            trigger: "axis", // hover触发器
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
              shadowStyle: {
                color: "rgba(150,150,150,0.1)", // hover颜色
              },
            },
          },
          formatter: function (e) {
            if (e instanceof Array) {
              return e[0].name + "：" + e[0].value + "元";
            }
          },
          geo: {
            show: true,
            map: "china",
            roam: false,
            zoom: 1,
            center: [117.83531246, 34.0267395887],
            label: {
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                borderColor: "rgba(147, 235, 248, 1)",
                borderWidth: 1,
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
                shadowColor: "rgba(128, 217, 248, 1)",
                // shadowColor: 'rgba(255, 255, 255, 1)',
                shadowOffsetX: -2,
                shadowOffsetY: 2,
                shadowBlur: 10,
              },
              emphasis: {
                areaColor: "#389BB7",
                borderWidth: 0,
              },
            },
          },
        },
        options: [],
      };
      for (var n = 0; n < year.length; n++) {
        optionXyMap01.options.push({
          backgroundColor: "",
          title: [
            {
              text: "各城市销售额",
              left: "30%",
              top: "2%",
              textStyle: {
                color: "#000",
                fontSize: 20,
              },
            },
            {
              id: "statistic",
              text: year[n] + "数据统计情况",
              // left: "70%",
              right: "7%",
              top: "2%",
              textStyle: {
                color: "#000",
                fontSize: 20,
              },
            },
          ],
          xAxis: {
            type: "value",
            scale: true,
            position: "top",
            min: 0,
            boundaryGap: false,
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              margin: 2,
              show: false, // 不显示刻度
              textStyle: {
                color: "#aaa",
              },
            },
          },
          yAxis: {
            type: "category",
            //  name: 'TOP 20',
            nameGap: 16,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#ddd",
              },
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: "#ddd",
              },
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#000",
              },
            },
            data: categoryData[n],
          },

          series: [
            // 地图
            {
              type: "map",
              map: "china",
              geoIndex: 0,
              aspectScale: 0.75, // 长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: "#fff",
                  },
                },
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: "#031525",
                  borderColor: "#FFFFFF",
                },
                emphasis: {
                  areaColor: "#2B91B7",
                },
              },
              animation: false,
              data: mapData,
            },
            // 地图中闪烁的点
            {
              //  name: 'Top 5',
              type: "effectScatter",
              coordinateSystem: "geo",
              data: convertData(
                mapData[n]
                  .sort(function (a, b) {
                    return b.value - a.value;
                  })
                  .slice(0, 20)
              ),
              symbolSize: function (val) {
                var num = val[2] / 2500000;
                if (num > 25) {
                  return 25;
                } else {
                  return num;
                }
              },
              showEffectOn: "render",
              rippleEffect: {
                brushType: "stroke",
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: true,
                },
              },
              itemStyle: {
                normal: {
                  color: colors[colorIndex][n],
                  shadowBlur: 10,
                  shadowColor: colors[colorIndex][n],
                },
              },
              zlevel: 1,
            },
            // 柱状图
            {
              zlevel: 1.5,
              type: "bar",
              symbol: "none",
              barWidth: "50%",
              itemStyle: {
                normal: {
                  color: colors[colorIndex][n],
                },
              },
              data: barData[n],
            },
          ],
        });
      }
      that.setOption(optionXyMap01);
      window.addEventListener("resize", function () {
        that.resize();
      });
    },
  },
};
</script>

<style>
.index-icon {
  margin: 1%;
  margin-left: 0;
}
</style>
