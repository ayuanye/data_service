<template>
  <div class="daily">
    <div class="search">
      <div class="option-wrapper">
        <span>日期:</span>
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 150px"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <Button type="info" @click="getData">查询</Button>
      </div>
    </div>
    <div class="content">
      <p class="title">宜兴地区电网运行情况</p>
      <p class="sentence">
        2020年3月29日生产情况：网供最高负荷119.46万千瓦，地区最高负荷136.88万千瓦；网供电量2611万千瓦时；地区电量2712万千瓦时；今年累计网供电量166934.20万千瓦时，同比增长-21.2%；今年累计地区电量177727.30万千瓦时，同比增长-21.1%；跳闸情况：今日无线路跳闸。
      </p>
    </div>
    <div class="statistical-chart">
      <div class="left" ref="chartsLeft">
      </div>
      <div class="right" ref="chartsRight">
      </div>
    </div>
    <Row style="width: 100%;">
      <Col span="11">
        <div class="growth-rate" ref="chartsBottom">
        </div>
      </Col>
      <Col span="11" offset="1">
        <div class="growth-rate" ref="dailyContrast">
        </div>
      </Col>
    </Row>
    <Row style="width: 100%;">
      <Col span="11">
        <div class="growth-rate" ref="dailyTopContrast">
        </div>
      </Col>
      <Col span="11" offset="1">
        <div class="growth-rate" ref="dailyLowContrast">
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import Echarts from 'echarts/lib/echarts'
import { Row, Col } from 'view-design'
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
export default {
  components: {
    Row,
    Col
  },
  data () {
    return {
      leftCharts: null,
      rightCharts: null,
      bottomCharts: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getData()
    })
  },
  methods: {
    setLeftOptions () {
      this.leftCharts.setOption({
        title: {
          text: '每日最高最低负荷量对比',
          x: 'center',
          y: '20'
        },
        tooltip: {},
        xAxis: [
          {
            type: 'category',
            data: ['2017年4月', '2018年4月', '2019年4月', '2020年4月'],
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
        yAxis: [{
          name: '单位:万千瓦',
          nameLocation: 'center',
          nameTextStyle: {
            color: '#707070',
            fontWeight: 'bold'
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
        }],
        series: [
          {
            name: '最高',
            type: 'bar',
            data: [10, 15, 20, 25],
            barGap: 0,
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#43A9FF',
                barBorderRadius: 5
              }
            }
          },
          {
            name: '最低',
            type: 'bar',
            data: [25, 20, 15, 10],
            barGap: 0.5,
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#0EDCEE',
                barBorderRadius: 5
              }
            }
          }
        ]
      })
    },
    setRightOptions () {
      this.rightCharts.setOption({
        title: {
          text: '每日调度电量对比',
          x: 'center',
          y: '20'
        },
        tooltip: {},
        xAxis: [
          {
            type: 'category',
            data: ['2017年4月1日 ', '2018年4月1日', '2019年4月1日 ', '2020年4月1日'],
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
          name: '单位:万千瓦时',
          nameLocation: 'center',
          nameTextStyle: {
            color: '#707070',
            fontWeight: 'bold'
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
            data: [8, 16, 32, 64],
            barGap: 0,
            barWidth: 30,
            itemStyle: {
              normal: {
                color: '#ADB9FF',
                barBorderRadius: 5
              }
            }
          }
        ]
      })
    },
    setBottomOptions () {
      let date = this.createDate(30)
      let wid = this.$refs.chartsBottom.offsetWidth - 60
      this.bottomCharts.setOption({
        title: {
          text: '复工复产后日调度电量,负荷同比增长率情况',
          x: 'center',
          y: '0'
        },
        grid: {
          left: 60,
          width: wid
        },
        legend: {
          right: 0,
          top: 30,
          data: ['日用电量 增长率', '最高负荷 增长率', '最低负荷 增长率']
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            data: date,
            axisLabel: {
              interval: 2,
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
            formatter: '{value}.00%',
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
              color: '#43A9FF',
              opacity: 0.2
            },
            smooth: true,
            symbol: 'none',
            name: '日用电量 增长率',
            type: 'line',
            data: this.createRate(30),
            barGap: 0,
            itemStyle: {
              normal: {
                color: '#43A9FF'
              }
            }
          },
          {
            areaStyle: {
              color: '#0EDCEE',
              opacity: 0.2
            },
            symbol: 'none',
            smooth: true,
            name: '最高负荷 增长率',
            type: 'line',
            data: this.createRate(30),
            barGap: 0,
            barWidth: 70,
            itemStyle: {
              normal: {
                color: '#0EDCEE'
              }
            }
          },
          {
            areaStyle: {
              color: '#ADB9FF',
              opacity: 0.2
            },
            symbol: 'none',
            smooth: true,
            name: '最低负荷 增长率',
            type: 'line',
            data: this.createRate(30),
            barGap: 0,
            itemStyle: {
              normal: {
                color: '#ADB9FF'
              }
            }
          }
        ]
      })
    },
    setContrastOptions (myCharts, chartsDom, title) {
      let date = this.createDate(30)
      let wid = chartsDom.offsetWidth - 60
      myCharts.setOption({
        title: {
          text: title,
          x: 'center',
          y: '0'
        },
        grid: {
          left: 60,
          width: wid
        },
        legend: {
          right: 0,
          data: ['19年', '20年']
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            data: date,
            axisLabel: {
              interval: 2,
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
            formatter: '{value}.00%',
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
            name: '19年',
            type: 'line',
            data: this.createRate(30),
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
            name: '20年',
            type: 'line',
            data: this.createRate(30),
            barGap: 0,
            itemStyle: {
              normal: {
                color: '#6ba9f1'
              }
            }
          }
        ]
      })
    },
    createDate (len) {
      let date = []
      for (let i = 0; i < len; i++) {
        date.push(`4月${i + 1}日`)
      }
      return date
    },
    createRate (len) {
      let rates = []
      for (let i = 0; i < len; i++) {
        rates.push(Math.random().toFixed(2) * 49 + 50)
      }
      return rates
    },
    getData () {
      this.leftCharts = Echarts.init(this.$refs.chartsLeft)
      this.setLeftOptions()
      this.rightCharts = Echarts.init(this.$refs.chartsRight)
      this.setRightOptions()
      this.bottomCharts = Echarts.init(this.$refs.chartsBottom)
      this.setBottomOptions()
      this.dailyContrast = Echarts.init(this.$refs.dailyContrast)
      this.setContrastOptions(this.dailyContrast, this.$refs.dailyContrast, '每日调度电量对比')
      this.dailyTopContrast = Echarts.init(this.$refs.dailyTopContrast)
      this.setContrastOptions(this.dailyTopContrast, this.$refs.dailyTopContrast, '每日最高调度负荷对比')
      this.dailyLowContrast = Echarts.init(this.$refs.dailyLowContrast)
      this.setContrastOptions(this.dailyLowContrast, this.$refs.dailyLowContrast, '每日最低调度负荷对比')
    }
  }
}
</script>
<style lang="stylus" scoped>
.daily
  width: 100%
  min-height: 100%
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center
  background-color: #fff
  padding: 15px
  padding-top 0
  border-radius: 5px
  .search
    width: 100%
    box-sizing: border-box
    display: flex
    justify-content flex-start
    align-items flex-start
    flex-wrap wrap
    padding-bottom 20px
    border-bottom 1px solid #eee
    .option-wrapper
      display flex
      justify-content flex-start
      align-items center
      margin-right: 10px
      span
        margin-right: 10px
  .content
    width 100%
    margin-top 20px
    .title
      width 100%
      text-align center
      font-size 20px
      font-weight 600
    .sentence
      width 100%
      text-indent 30px
      font-size 16px
  .statistical-chart
    width 100%
    height 350px
    display flex
    justify-content space-between
    align-items flex-start
    div
      width 50%
      height 100%
  .growth-rate
    width 100%
    height 330px
    margin-top 10px
</style>
