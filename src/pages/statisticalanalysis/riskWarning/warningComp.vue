<template>
  <div class="warning" ref="warning">

  </div>
</template>

<script>
import Echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
export default {
  data () {
    return {
      warningCharts: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initRef()
    })
  },
  methods: {
    initRef () {
      this.warningCharts = Echarts.init(this.$refs.warning)
      this.setChartOptions()
    },
    setChartOptions () {
      this.warningCharts.setOption({
        tooltip: {},
        legend: {
          right: 15,
          top: 10,
          data: ['2018', '2019', '2020']
        },
        grid: {
          left: 30,
          top: 40,
          height: '76%',
          width: '95%'
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
              show: true
            },
            axisLine: {
              lineStyle: {
                color: '#B2CDE9',
                width: 4,
                type: 'solid'
              }
            }
          }
        ],
        yAxis: {
          splitLine: {
            show: true
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
              width: 4,
              type: 'solid'
            }
          },
          nameGap: 30
        },
        series: [
          {
            name: '2018',
            type: 'bar',
            data: [10, 20, 30, 40, 30, 20, 10, 5, 10, 5, 23, 22],
            barGap: 0,
            barWidth: 8,
            itemStyle: {
              normal: {
                color: '#389FFF'
              }
            }
          },
          {
            name: '2019',
            type: 'bar',
            data: [15, 5, 4, 30, 18, 28, 29, 40, 10, 30, 16, 40],
            barGap: 0.5,
            barWidth: 8,
            itemStyle: {
              normal: {
                color: '#00C5B4'
              }
            }
          },
          {
            name: '2020',
            type: 'bar',
            data: [10, 20, 30, 40, 30, 20, 10, 5, 10, 5, 23, 22],
            barGap: 0.5,
            barWidth: 8,
            itemStyle: {
              normal: {
                color: '#7D4FEF'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.warning
  width 100%
  height 260px
</style>
