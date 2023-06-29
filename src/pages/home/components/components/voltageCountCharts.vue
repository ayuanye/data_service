<template>
  <div class="v-charts" ref="pieChart"></div>
</template>

<script>
import Echarts from 'echarts/lib/echarts'
import { pieOptions, nowSize } from '@/utils/chartsOptions'
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
export default {
  props: ['data'],
  data () {
    return {
      pieChart: null
    }
  },
  computed: {
    pieData () {
      console.log()
      return this.data.map(v => {
        v.name = v.dydj
        v.value = v.num
        return v
      })
    }
  },
  watch: {
    pieData (val) {
      this.$nextTick(() => {
        this.setOptions()
      })
    }
  },
  methods: {
    setOptions () {
      this.pieChart = Echarts.init(this.$refs.pieChart)
      this.pieChart.setOption(
        pieOptions(
          '电压等\n级统计',
          this.pieData,
          [nowSize(45), '90%'],
          [nowSize(90), '50%'],
          {
            icon: 'circle',
            padding: nowSize(8),
            itemGap: nowSize(20),
            itemWidth: nowSize(10),
            right: nowSize(50),
            formatter: (name) => {
              let times = 0
              this.pieData.forEach(e => {
                if (e.name === name) {
                  times = e.value
                }
              })
              // let emp = '     '
              // if (name === '110kV' || name === '220kV') {
              //   emp = '   '
              // } else if (name === '其他') {
              //   emp = '     '
              // }
              while (name.length < 8) {
                name = name + ' '
              }
              return name + times + '次'
            },
            textStyle: {
              fontWeight: 900,
              fontSize: nowSize(14)
            }
          },
          false,
          ['#27a6ef', '#0bccaf', '#f5af71', '#f1e790', '#cccccc'],
          {
            x: nowSize(65),
            y: '38%',
            textStyle: {
              fontSize: nowSize(14),
              lineHeight: nowSize(18)
            }
          }
        )
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-charts
  width 365px
  height 180px
</style>
