<template>
  <div class="risk" ref="risk">

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
      riskCharts: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initRef()
    })
  },
  methods: {
    initRef () {
      this.riskCharts = Echarts.init(this.$refs.risk)
      this.setChartOptions()
    },
    setChartOptions () {
      this.riskCharts.setOption({
        tooltip: {},
        legend: {
          right: 15,
          top: 10,
          data: ['电量']
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
            data: ['2020-04-25', '2020-04-26', '2020-04-27', '2020-04-28', '2020-04-29', '2020-04-30', '2020-05-01'],
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
            name: '电量',
            type: 'bar',
            data: [2, 4, 6, 8, 6, 4, 2],
            barGap: 0,
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#389FFF',
                barBorderRadius: 5
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
.risk
  width 100%
  height 260px
</style>
