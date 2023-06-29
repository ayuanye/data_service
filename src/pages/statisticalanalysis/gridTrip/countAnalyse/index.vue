<template>
  <div class="limitcount">
    <div class="search top-search">
      <div class="option-wrapper" style="margin-right: 20px;">
        <span>起始日期:</span>
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 130px"
        ></DatePicker>
      </div>
      <div class="option-wrapper" style="margin-right: 20px;">
        <span>结束日期:</span>
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 130px"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <Button type="info">上一月</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info">下一月</Button>
      </div>
    </div>
    <div class="search">
      <div class="option-wrapper" style="margin-right: 20px;">
        <span>间隔名称:</span>
        <Input placeholder="请输入内容"></Input>
      </div>
      <div class="option-wrapper" style="margin-right: 20px;">
        <span>厂站名称:</span>
        <Input placeholder="请输入内容"></Input>
      </div>
      <div class="option-wrapper" style="margin-right: 20px;">
        <span>故障类型:</span>
        <Select v-model="faultType" style="width:150px">
          <Option
            v-for="item in faultTypeList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
      <div class="option-wrapper" style="margin-right: 20px;">
        <span>故障地区:</span>
        <Select v-model="faultArea" style="width:150px">
          <Option
            v-for="item in faultAreaList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
      <div class="option-wrapper" style="margin-right: 20px;">
        <span>主配网:</span>
        <Select v-model="netType" style="width:150px">
          <Option
            v-for="item in netTypeList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
      <div class="option-wrapper">
        <Button type="info">统计</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info">重复停电统计</Button>
      </div>
    </div>
    <div class="content">
      <div class="bar-chart" ref="barChart"></div>
      <div class="count-table">
        <Table
          :columns="columns"
          :data="data"
          stripe
          border
          ref="table"
          max-height="350"
          :loading="loading"
        >
        </Table>
      </div>
      <Row style="margin-top: 10px;">
        <Col span="11" style="height: 200px;" >
          <div style="width: 100%; height: 100%;" ref="fault">

          </div>
        </Col>
        <Col span="11" offset="1" style="height: 200px;font-size:18px;">
          <p style="margin-top: 10px;">
            从2020-07-01至2020-07-10,市区配网线故障共计3条次,其中跳闸故障3条次,重合成功2条次,接地故障0条次.同比增加0.00%
          </p>
          <p style="margin-top: 20px;">故障原因统计:</p>
          <p style="margin-top: 10px;">外力破坏引起1条次, 占比33.33%</p>
          <p>其他故障引起2条次, 占比77.77%</p>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { Select, Option, Row, Col } from 'view-design'
// import groupHead from './groupHead'
import Echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
export default {
  components: {
    Select,
    Option,
    Row,
    Col
  },
  data () {
    return {
      piCharts: null,
      columns: [{
        title: '地区',
        key: 'area',
        align: 'center'
      }, {
        title: '统计',
        key: 'count',
        align: 'center'
      }, {
        title: '10kv',
        align: 'center',
        children: [{
          title: '重合成功',
          key: 'chcg',
          align: 'center'
        }, {
          title: '重合不成',
          key: 'chbc',
          align: 'center'
        }, {
          title: '分级保护',
          key: 'fjbh',
          align: 'center'
        }, {
          title: '接地',
          key: 'jd',
          align: 'center'
        }]
      }, {
        title: '20kv',
        align: 'center',
        children: [{
          title: '重合成功',
          key: 'chcg',
          align: 'center'
        }, {
          title: '重合不成',
          key: 'chbc',
          align: 'center'
        }, {
          title: '分级保护',
          key: 'fjbh',
          align: 'center'
        }, {
          title: '接地',
          key: 'jd',
          align: 'center'
        }]
      }],
      data: [{
        area: '无锡',
        count: 3,
        chcg: 2,
        chbc: 1,
        fjbh: 0,
        jd: 0
      }],
      loading: false,
      barCharts: null,
      faultType: 1,
      faultTypeList: [
        {
          value: 1,
          label: '全部'
        }
      ],
      faultArea: 1,
      faultAreaList: [
        {
          value: 1,
          label: '市区'
        },
        {
          value: 2,
          label: '县城'
        }
      ],
      netType: 1,
      netTypeList: [
        {
          value: 1,
          label: '主网'
        },
        {
          value: 2,
          label: '配网'
        }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  methods: {
    initCharts () {
      this.barCharts = Echarts.init(this.$refs.barChart)
      this.setBarCountOptions()
      this.pieCharts = Echarts.init(this.$refs.fault)
      this.setPieOptions()
    },
    setPieOptions () {
      this.pieCharts.setOption({
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
                name: '外力破坏 占',
                value: 30,
                itemStyle: {
                  color: '#1BD7D9'
                }
              },
              {
                name: '其他故障 占',
                value: 70,
                itemStyle: {
                  color: '#F58E79'
                }
              }
            ]
          }
        ]
      })
    },
    setBarCountOptions () {
      this.barCharts.setOption({
        tooltip: {},
        legend: {
          right: 0,
          top: 20,
          data: [
            '故障统计',
            '10kv重合成功',
            '10kv重合不成',
            '10kv分级保护',
            '20kv重合成功',
            '20kv重合不成功',
            '20kv分级保护',
            '10kv接地故障',
            '20kv接地故障'
          ]
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
            data: ['无锡'],
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
            name: '故障统计',
            type: 'bar',
            data: [50],
            barGap: 0,
            barWidth: 60,
            itemStyle: {
              normal: {
                color: this.changeColor('#7D4FEF')
              }
            }
          },
          {
            name: '10kv重合成功',
            stack: '10kv',
            type: 'bar',
            data: [60],
            barGap: 0.5,
            barWidth: 60,
            itemStyle: {
              normal: {
                color: this.changeColor('#E2BCFF')
              }
            }
          },
          {
            name: '10kv重合不成',
            stack: '10kv',
            type: 'bar',
            data: [70],
            barGap: 0.5,
            barWidth: 60,
            itemStyle: {
              normal: {
                color: this.changeColor('#F5B450')
              }
            }
          },
          {
            name: '10kv分级保护',
            stack: '10kv',
            type: 'bar',
            data: [150],
            barGap: 0.5,
            barWidth: 60,
            itemStyle: {
              normal: {
                color: this.changeColor('#1BD7D9')
              }
            }
          },
          {
            name: '20kv重合成功',
            stack: '20kv',
            type: 'bar',
            data: [100],
            barGap: 0.5,
            barWidth: 60,
            itemStyle: {
              normal: {
                color: this.changeColor('#5483FF')
              }
            }
          },
          {
            name: '20kv重合不成功',
            stack: '20kv',
            type: 'bar',
            data: [30],
            barGap: 0.5,
            barWidth: 60,
            itemStyle: {
              normal: {
                color: this.changeColor('#f06268')
              }
            }
          },
          {
            name: '20kv分级保护',
            stack: '20kv',
            type: 'bar',
            data: [150],
            barGap: 0.5,
            barWidth: 60,
            itemStyle: {
              normal: {
                color: this.changeColor('#62f086')
              }
            }
          },
          {
            name: '10kv接地故障',
            type: 'bar',
            data: [150],
            barGap: 0.5,
            barWidth: 60,
            itemStyle: {
              normal: {
                color: this.changeColor('#ecbadf')
              }
            }
          },
          {
            name: '20kv接地故障',
            type: 'bar',
            data: [150],
            barGap: 0.5,
            barWidth: 60,
            itemStyle: {
              normal: {
                color: this.changeColor('#d6e593')
              }
            }
          }
        ]
      })
    },
    changeColor (color) {
      return new Echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1, // 4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
        [
          { offset: 0, color: color },
          { offset: 1, color: '#eff1d7' }
        ] // 数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
  .limitcount/deep/.ivu-table-tip
    overflow-x hidden
  .limitcount
    contentWrapper()
    padding-top 0
    .search
      width 100%
      box-sizing border-box
      display flex
      justify-content flex-start
      align-items flex-start
      flex-wrap wrap
      border-bottom 1px solid #eee
      .option-wrapper
        display flex
        justify-content flex-start
        align-items center
        margin-right 10px
        margin-bottom 10px
        span
          margin-right: 10px
          white-space nowrap
    .top-search
      border-bottom none
    .content
      width 100%
      .bar-chart
        width 100%
        margin-top 20px
        height 350px
</style>
