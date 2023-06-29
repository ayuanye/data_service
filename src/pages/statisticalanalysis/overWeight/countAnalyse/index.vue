<template>
  <div class="limitcount">
    <div class="search">
      <div class="option-wrapper">
        <span>日期:</span>
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 130px"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <span>至:</span>
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 130px"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <Button type="info" @click="getData">查询</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info" @click="getData">导出</Button>
      </div>
    </div>
    <div class="content">
      <Row>
        <Col span="12">
          <div class="top">
            <div class="header">
              <aside class="left">
                <i
                  class="iconfont iconfenleiliebiao"
                  style="color: #3992D0;"
                ></i>
                <span style="margin-left: 5px;">越限分布情况</span>
              </aside>
              <aside class="right">
                <span>区间选择:</span>
                <RadioGroup v-model="choose" style="margin-left: 10px;">
                  <Radio label="70%及以上" style="margin-left: 10px;"></Radio>
                  <Radio label="80%及以上" style="margin-left: 10px;"></Radio>
                  <Radio label="90%及以上" style="margin-left: 10px;"></Radio>
                  <Radio label="100%" style="margin-left: 10px;"></Radio>
                </RadioGroup>
              </aside>
            </div>
            <div class="charts" ref="condition"></div>
          </div>
          <div class="bottom">
            <div class="header">
              <aside class="left">
                <i
                  class="iconfont iconfenleiliebiao"
                  style="color: #3992D0;"
                ></i>
                <span style="margin-left: 5px;">越限区间分布</span>
              </aside>
            </div>
            <div class="section">
              <aside class="charts" ref="section"></aside>
              <aside class="desc">
                <div class="sec-wrapper">
                  <p>
                    <i class="circle circle-outer" style="background-color: rgba(255, 156, 133, 0.4);">
                      <i class="circle circle-inner" style="background-color: rgb(255, 156, 133);"></i>
                    </i>
                    <span>负载率 <b>(100%及以上)</b></span>
                  </p>
                  <p class="number">
                    <span>
                      数量:
                      <b>2</b>
                      百分比:
                      <span class="percent color-self-orange">40%</span>
                    </span>
                  </p>
                </div>
                <div class="sec-wrapper">
                  <p>
                    <i class="circle circle-outer" style="background-color: rgba(125, 79, 239, 0.4);">
                      <i class="circle circle-inner" style="background-color: rgb(125, 79, 239);"></i>
                    </i>
                    <span>负载率 <b>(90%~100%)</b></span>
                  </p>
                  <p class="number">
                    <span>
                      数量:
                      <b>2</b>
                      百分比:
                      <span class="percent color-purple">30%</span>
                    </span>
                  </p>
                </div>
                <div class="sec-wrapper">
                  <p>
                    <i class="circle circle-outer" style="background-color: rgba(0, 197, 180, 0.4);">
                      <i class="circle circle-inner" style="background-color: rgb(0, 197, 180);"></i>
                    </i>
                    <span>负载率 <b>(80%~90%)</b></span>
                  </p>
                  <p class="number">
                    <span>
                      数量:
                      <b>2</b>
                      百分比:
                      <span class="percent color-self-green">20%</span>
                    </span>
                  </p>
                </div>
                <div class="sec-wrapper">
                  <p>
                    <i class="circle circle-outer" style="background-color: rgba(48, 194, 246, 0.4);">
                      <i class="circle circle-inner" style="background-color: rgb(48, 194, 246);"></i>
                    </i>
                    <span>负载率 <b>(70%~80%)</b></span>
                  </p>
                  <p class="number">
                    <span>
                      数量:
                      <b>2</b>
                      百分比:
                      <span class="percent color-cyan">10%</span>
                    </span>
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </Col>
        <Col span="11" offset="1" class="detail">
          <div class="header">
            <aside class="left">
              <i
                class="iconfont iconfenleiliebiao"
                style="color: #3992D0;"
              ></i>
              <span style="margin-left: 5px;">越限明细</span>
            </aside>
            <aside class="right">
              <Button type="info">参数阈值设置</Button>
            </aside>
          </div>
          <div class="info-wrapper">
            <div class="spin-wrapper" v-show="showLoading">
              <Spin fix>
                <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
                <div>Loading</div>
              </Spin>
            </div>
            <div class="info" v-for="(item, index) in info" :key="index">
              <div class="title">
                {{index + 1 + '.' + item.title}}
              </div>
              <div class="performance">
                <Row>
                  <Col span="8" class="col">
                    <i class="iconfont iconguding" style="color: #6B94FF;"></i>
                    <span>额定值: {{item.rating}}</span>
                  </Col>
                  <Col span="8" class="col">
                    <i class="iconfont iconshijian" style="color: #1BD7D9;"></i>
                    <span>越限时间: {{item.overTime}}</span>
                  </Col>
                  <Col span="8" class="col">
                    <i class="iconfont iconfuzaishuai" style="color: #F5B450;"></i>
                    <span>最高负载率: {{item.highestLoad}}</span>
                  </Col>
                </Row>
                <Row style="margin-top: 5px;">
                  <Col span="8" class="col">
                    <i class="iconfont iconceliang" style="color: #6B94FF;"></i>
                    <span>实测值: {{item.realValue}}</span>
                  </Col>
                  <Col span="8" class="col">
                    <i class="iconfont iconshichang" style="color: #1BD7D9;"></i>
                    <span>越限时长: {{item.duration}}</span>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { Row, Col, RadioGroup, Radio, Spin } from 'view-design'
import Echarts from 'echarts/lib/echarts'
import { countAnalyse } from '@/services/dataMaintenance'
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
export default {
  data () {
    return {
      showLoading: false,
      info: [],
      conditionCharts: null,
      choose: '70%及以上'
    }
  },
  components: {
    Row,
    Col,
    RadioGroup,
    Radio,
    Spin
  },
  mounted () {
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.showLoading = true
      countAnalyse().then(res => {
        this.info = res.data
        this.showLoading = false
      })
    },
    initConditionOptions () {
      this.conditionCharts.setOption({
        tooltip: {},
        legend: {
          right: 0,
          top: 20,
          data: ['10kv', '20kv', '35kv', '110kv', '220kv']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['主变', '线路'],
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
                width: 2,
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
                width: 2,
                type: 'solid'
              }
            },
            nameGap: 30
          }
        ],
        series: [
          {
            name: '10kv',
            stack: true,
            type: 'bar',
            data: [50, 85],
            barGap: 0,
            barWidth: 60,
            itemStyle: {
              normal: {
                color: '#7D4FEF'
              }
            }
          },
          {
            name: '20kv',
            stack: true,
            type: 'bar',
            data: [60, 72],
            barGap: 0.5,
            barWidth: 60,
            itemStyle: {
              normal: {
                color: '#E2BCFF'
              }
            }
          },
          {
            name: '35kv',
            stack: true,
            type: 'bar',
            data: [70, 70],
            barGap: 0.5,
            barWidth: 60,
            itemStyle: {
              normal: {
                color: '#F5B450'
              }
            }
          },
          {
            name: '110kv',
            stack: true,
            type: 'bar',
            data: [150, 40],
            barGap: 0.5,
            barWidth: 60,
            itemStyle: {
              normal: {
                color: '#1BD7D9'
              }
            }
          },
          {
            name: '220kv',
            stack: true,
            type: 'bar',
            data: [100, 266],
            barGap: 0.5,
            barWidth: 60,
            itemStyle: {
              normal: {
                color: '#5483FF'
              }
            }
          }
        ]
      })
    },
    initSectionOptions () {
      this.sectionCharts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            radius: ['40%', '81%'],
            center: ['50%', '50%'],
            type: 'pie',
            roseType: 'radius',
            label: {
              normal: {
                show: true,
                formatter: '{b}{d}%',
                textStyle: {
                  fontSize: 15
                },
                position: 'outside'
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 5,
                length2: 25
              },
              emphasis: {
                show: true
              }
            },
            data: [
              {
                name: '70%~80% 占',
                value: 10,
                itemStyle: {
                  color: '#1BD7D9'
                }
              },
              {
                name: '80%~90% 占',
                value: 20,
                itemStyle: {
                  color: '#00C5B4'
                }
              },
              {
                name: '90%~100% 占',
                value: 30,
                itemStyle: {
                  color: '#7D4FEF'
                }
              },
              {
                name: '100%以上 占',
                value: 40,
                itemStyle: {
                  color: '#F58E79'
                }
              }
            ]
          }
        ]
      })
    },
    initCharts () {
      this.conditionCharts = Echarts.init(this.$refs.condition)
      this.initConditionOptions()
      this.sectionCharts = Echarts.init(this.$refs.section)
      this.initSectionOptions()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
@import '~@/assets/styles/animation.styl'
  .circle-outer
    display flex
    justify-content center
    align-items center
    position absolute
    left -20px
    top 4px
    width 16px
    height 16px
    border-radius 50%
    .circle-inner
      display inline-block
      width 8px
      height 8px
      border-radius 50%
  .limitcount/deep/.ivu-radio-wrapper-checked
    color #538fe9
  .limitcount
    contentWrapper()
    padding-top 0
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
      margin-top 10px
      width 100%
      .top, .bottom
        width 100%
        height 350px
        .header
          padding 5px 0
          border-bottom 1px solid #eee
          display flex
          justify-content space-between
          align-items center
          .left
            font-weight bold
          aside
            display flex
            justify-content flex-start
            align-items center
        .charts
          width 100%
          height 315px
      .bottom
        .section
          width 100%
          display flex
          justify-content space-between
          align-items flex-start
          .charts
            width 70%
          .desc
            width 30%
            height 315px
            display flex
            flex-direction column
            justify-content center
            align-items center
            .sec-wrapper
              margin-bottom 20px
              position relative
              .number
                margin-top 5px
                .percent
                  padding 5px
                  background-color #F4F4F4
      .detail
        .header
          height 35px
          border-bottom 1px solid #eee
          display flex
          justify-content space-between
          align-items center
          .left
            font-weight bold
          aside
            display flex
            justify-content flex-start
            align-items center
        .info-wrapper
          height 700px
          overflow-y auto
          margin-top 10px
          &::-webkit-scrollbar
            width 10px
            height 1px
          &::-webkit-scrollbar-thumb
            border-radius 10px
            background-color skyblue
            background-image -webkit-linear-gradient(45deg,rgba(255, 255, 255, 0.2) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, 0.2) 50%,rgba(255, 255, 255, 0.2) 75%,transparent 75%,transparent)
          .info
            margin-bottom 10px
          .title
            font-weight bold
            margin-bottom 5px
          .performance
            background-color #f9f9f9
            padding 5px
            .iconfont
              margin-right 5px
            .col
              display flex
              justify-content flex-start
              align-items center
</style>
