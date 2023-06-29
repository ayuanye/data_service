import Echarts from 'echarts/lib/echarts'
export const faultCountInfo = (xAxisArr, successArr, failedArr, touchGroundArr) => {
  xAxisArr = xAxisArr || []
  successArr = successArr || []
  failedArr = failedArr || []
  touchGroundArr = touchGroundArr || []
  return {
    tooltip: {},
    legend: {
      right: 10,
      top: 10,
      data: ['重合成功', '重合不成', '接地拉停']
    },
    grid: {
      left: '1%',
      right: '1%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisArr,
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#707070'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#B2CDE9',
            width: 1,
            type: 'solid'
          }
        }
      }
    ],
    yAxis: [
      {
        name: '(个)',
        nameLocation: 'end',
        nameTextStyle: {
          color: '#707070'
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['#FBFBFB', '#ffffff']
          }
        },
        axisLabel: {
          textStyle: {
            color: '#707070'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#B2CDE9',
            width: 1,
            type: 'solid'
          }
        },
        nameGap: 20
      }
    ],
    series: [
      {
        name: '重合成功',
        stack: true,
        type: 'bar',
        data: successArr,
        barGap: 0,
        barWidth: 40,
        itemStyle: {
          normal: {
            color: new Echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {
                  offset: 0,
                  color: '#15cbb8'
                },
                {
                  offset: 1,
                  color: '#ffffff'
                }
              ]
            )
          }
        }
      },
      {
        name: '重合不成',
        stack: true,
        type: 'bar',
        data: failedArr,
        barGap: 0.5,
        barWidth: 40,
        itemStyle: {
          normal: {
            color: new Echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {
                  offset: 0,
                  color: '#f28888'
                },
                {
                  offset: 1,
                  color: '#ffffff'
                }
              ]
            )
          }
        }
      },
      {
        name: '接地拉停',
        stack: true,
        type: 'bar',
        data: touchGroundArr,
        barGap: 0.5,
        barWidth: 40,
        itemStyle: {
          normal: {
            color: new Echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {
                  offset: 0,
                  color: '#afcadb'
                },
                {
                  offset: 1,
                  color: '#ffffff'
                }
              ]
            )
          }
        }
      }
    ]
  }
}
