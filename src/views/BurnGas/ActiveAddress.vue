<template>
  <div class="map">
    <div
      id="mainAddress"
      style="width: 100%; height: 400px; background: white"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted } from "vue";
import axios from "axios";
export default {
  created() {
    this.setup();
  },

  methods: {
    setup() {
      //methods
      const echartInit = () => {
        var myChart = echarts.init(document.getElementById("mainAddress"));

        var xdata14 = [];

        var xdata30 = [];

        var sdata14 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        var sdata30 = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ];

        getActiveAddress(14);

        getActiveAddress(30);

        for (var k = -13; k <= 0; k++) {
          xdata14.push(getDay(k));
        }
        for (var n = -29; n <= 0; n++) {
          xdata30.push(getDay(n));
        }
        function getDay(day) {
          var today = new Date();
          var todayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
          today.setTime(todayMilliseconds);
          var tMonth = today.toDateString().split(" ")[1];
          var tDate = today.toDateString().split(" ")[2];
          tMonth = doHandleMonth(tMonth);
          tDate = doHandleMonth(tDate);
          return tMonth + " " + tDate;
        }

        function doHandleMonth(month) {
          var m = month;
          if (month.toString().length == 1) {
            m = "0" + month;
          }
          return m;
        }
        function refreshData(Data, index) {
          var option = myChart.getOption();
          option.series[index].data = Data;
          myChart.setOption(option);
        }

        function getActiveAddress(day) {
          axios({
            method: "post",
            url: "/api",
            data: {
              params: { days: day },
              jsonrpc: "2.0",
              id: 1,
              method: "GetActiveAddresses",
            },
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            // console.log(res)
            if (day === 14) {
              for (var j = 0; j < res["data"]["result"].length; j++) {
                sdata14[13 - j] = res["data"]["result"][j]["ActiveAddresses"];
              }
              // console.log(sdata14)
              refreshData(sdata14, 0);
            } else {
              for (var m = 0; m < res["data"]["result"].length; m++) {
                sdata30[29 - m] = res["data"]["result"][m]["ActiveAddresses"];
              }
              // console.log("nouse")
              refreshData(sdata30, 1);
            }
          });
        }

        var option = {
          color: ["#0060FF99", "#0060FF99"],
          title: [
            {
              left: "6%",
              text: "Active Address",
              top: "4%",
              textStyle: {
                color: "#1D2129",
                fontSize: 18,
              },
            },
          ],
          tooltip: {
            trigger: "axis",
            backgroundColor: "#FFFFFF",
            // formatter:function (params){
            //   console.log(JSON.stringify(params[0]))
            //   return params[0]["name"] +"<br/>" +params[0]["value"]
            // }
          },
          legend: {
            icon: "circle",
            data: ["Recent 14 days", "Recent 30 days"],
            selected: { "Recent 30 days": false, "Recent 14 days": true },
            top: "4%",
            right: "2%",
            orient: "vertical",
            textStyle: {
              color: "#4E5969",
              fontSize: 14,
            },
          },
          xAxis: {
            type: "category",
            data: xdata14,
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#86909C",
              fontSize: 12,
            },
            axisLine: {
              lineStyle: {
                color: "#E5E6EB", //更改坐标轴颜色
              },
            },
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLabel: {
              color: "#86909C",
              fontSize: 12,
            },
          },
          grid: {
            left: "6%",
            containLabel: true,
            bottom: "6%",
          },
          series: [
            {
              name: "Recent 14 days",
              type: "line",
              data: sdata14,
              smooth: true,
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#e6effe",
                  },
                  {
                    offset: 1,
                    color: "rgb(255,255,255)",
                  },
                ]),
              },
            },
            {
              name: "Recent 30 days",
              type: "line",
              data: sdata30,
              smooth: true,
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#e6effe",
                  },
                  {
                    offset: 1,
                    color: "rgb(255,255,255)",
                  },
                ]),
              },
            },
          ],
        };
        var option2 = {
          color: ["#0060FF99", "#0060FF99"],
          title: [
            {
              left: "center",
              text: "Active Address",
              top: "4%",
              textStyle: {
                color: "#1D2129",
                fontSize: 18,
              },
            },
          ],
          tooltip: {
            trigger: "axis",
          },
          legend: {
            icon: "circle",
            data: ["Recent 14 days", "Recent 30 days"],
            selected: { "Recent 30 days": false, "Recent 14 days": true },
            top: "12%",
            left: "center",
            orient: "vertical",
            textStyle: {
              color: "#4E5969",
              fontSize: 14,
            },
          },
          xAxis: {
            type: "category",
            data: xdata14,
            splitLine: {
              show: false,
            },
            axisLabel: {
              color: "#86909C",
              fontSize: 12,
            },
            axisLine: {
              lineStyle: {
                color: "#E5E6EB", //更改坐标轴颜色
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLabel: {
              color: "#86909C",
              fontSize: 12,
            },
          },
          grid: {
            left: "6%",
            containLabel: true,
            bottom: "6%",
            top: "25%",
          },
          series: [
            {
              name: "Recent 14 days",
              type: "line",
              data: sdata14,
              smooth: true,
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#e6effe",
                  },
                  {
                    offset: 1,
                    color: "rgb(255,255,255)",
                  },
                ]),
              },
            },
            {
              name: "Recent 30 days",
              type: "line",
              data: sdata30,
              smooth: true,
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#e6effe",
                  },
                  {
                    offset: 1,
                    color: "rgb(255,255,255)",
                  },
                ]),
              },
            },
          ],
        };
        // 使用刚指定的配置项和数据显示图表。
        if (window.innerWidth > 552) {
          myChart.setOption(option);
        } else {
          myChart.setOption(option2);
        }

        window.addEventListener("resize", function () {
          myChart.resize();
          var windowWidth = window.innerWidth;
          if (windowWidth < 552) {
            myChart.setOption(option2);
          }
          if (windowWidth > 552) {
            myChart.setOption(option);
          }
        });
        myChart.on("legendselectchanged", function (params) {
          // console.log(params)
          let legend = params.name;
          let selected = params.selected;
          if (selected !== undefined) {
            if (legend === "Recent 14 days") {
              // console.log(legend)
              if (
                selected["Recent 14 days"] === true &&
                selected["Recent 30 days"] === true
              ) {
                // console.log("winner")
                myChart.setOption({
                  legend: {
                    selected: {
                      [legend]: true,
                      ["Recent 30 days"]: false,
                    },
                  },
                  xAxis: {
                    data: xdata14,
                  },
                });
              }
              if (
                selected["Recent 14 days"] === false &&
                selected["Recent 30 days"] === false
              ) {
                myChart.setOption({
                  legend: {
                    selected: {
                      [legend]: false,
                      ["Recent 30 days"]: true,
                    },
                  },
                  xAxis: {
                    data: xdata30,
                  },
                });
              }
            } else {
              if (
                selected["Recent 30 days"] == false &&
                selected["Recent 14 days"] == false
              ) {
                myChart.setOption({
                  legend: {
                    selected: {
                      [legend]: false,
                      ["Recent 14 days"]: true,
                    },
                  },
                  xAxis: {
                    data: xdata14,
                  },
                });
              }
              if (
                selected["Recent 30 days"] == true &&
                selected["Recent 14 days"] == true
              ) {
                myChart.setOption({
                  legend: {
                    selected: {
                      [legend]: true,
                      ["Recent 14 days"]: false,
                    },
                  },
                  xAxis: {
                    data: xdata30,
                  },
                });
              }
            }
          }
        });
      };

      //onMounted
      onMounted(() => {
        echartInit();
      });
      //return
      return {
        echartInit,
      };
    },
  },
};
</script>

<style></style>
