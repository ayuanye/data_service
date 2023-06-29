<template>
  <div class="load">
    <div class="line-charts" ref="lineCharts">
    </div>
    <div class="desc">
      <p>①、本周上周地区最高日电量:<span class="sky-blue">2643.00</span>万千瓦时(2020-04-05)/<span class="sky-blue">2548.00</span>万千瓦时(2020-04-06);</p>
      <p>②、本周上周地区平均日电量:<span class="sky-blue">2522.67</span>万千瓦时/<span class="sky-blue">2467.37</span>万千瓦时</p>
      <p>③、本周上周地区最高负荷:<span class="sky-blue">137.15</span>万千瓦(2020-04-05)/<span class="sky-blue">130.17</span>万千瓦(2020-04-06);
        本周上周网供最高负电荷<span class="sky-blue">119.13</span>万千瓦(2020-04-07)/<span class="sky-blue">113.64</span>万千瓦(2020-04-09)
      </p>
      <p>④、网供电量<span class="sky-blue">1.6754</span>亿千瓦时,同比增长<span class="color-self-orange">-8.85%</span>;
        地区电量<span class="sky-blue">1.75645</span>亿千瓦时,同比增长<span class="color-self-orange">-7.56%</span>;
        今年累计网供电量<span class="sky-blue">15.15152</span>亿千瓦时,同比增长<span class="color-self-orange">-22.25%</span>;
        今年累计地区电量<span class="sky-blue">16.215212</span>亿千瓦时,同比增长<span class="color-self-orange">-22.66%</span>。
      </p>
    </div>
  </div>
</template>

<script>
import Echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
export default {
  data () {
    return {
      lineCharts: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.lineCharts = Echarts.init(this.$refs.lineCharts)
      this.setChartsOptions(this.lineCharts, this.$refs.lineCharts)
    })
  },
  methods: {
    createDate (len) {
      let date = []
      for (let i = 0; i < len; i++) {
        date.push(`2020年3月${i + 1}日`)
      }
      return date
    },
    createRate (len) {
      let rates = []
      for (let i = 0; i < len; i++) {
        rates.push(Math.random().toFixed(2) * 2000)
      }
      return rates
    },
    setChartsOptions (myCharts, chartsDom) {
      let date = this.createDate(10)
      let wid = chartsDom.offsetWidth - 60
      myCharts.setOption({
        grid: {
          left: 60,
          width: wid
        },
        legend: {
          right: 0,
          data: ['本周电量', '上周电量']
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            data: date,
            axisLabel: {
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
        yAxis: [{
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#707070'
            }
          },
          splitLine: {
            show: true
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#FBFBFB', '#ffffff']
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
        }],
        series: [
          {
            areaStyle: {
              color: '#49e0c5',
              opacity: 0.2
            },
            smooth: true,
            name: '本周电量',
            type: 'line',
            data: this.createRate(10),
            barGap: 0,
            itemStyle: {
              normal: {
                color: '#49e0c5'
              }
            }
          },
          {
            areaStyle: {
              color: '#6ba9f1',
              opacity: 0.2
            },
            smooth: true,
            name: '上周电量',
            type: 'line',
            data: this.createRate(10),
            barGap: 0,
            itemStyle: {
              normal: {
                color: '#6ba9f1'
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
@import '~@/assets/styles/mixins.styl'
.load
  width 100%
  .line-charts
    width 100%
    height 300px
  .desc
    line-height 30px
    font-size 16px
</style>
