<template>
  <div class="c-charts" ref="pieChart"></div>
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
  watch: {
    pieData () {
      this.$nextTick(() => {
        this.setOptions()
      })
    }
  },
  computed: {
    pieData () {
      return this.data.map(v => {
        v.name = v.chqk
        v.value = v.num
        return v
      })
    }
  },
  methods: {
    setOptions () {
      this.pieChart = Echarts.init(this.$refs.pieChart)
      this.pieChart.setOption(
        pieOptions(
          '重合情\n况统计',
          this.pieData,
          [nowSize(45), '90%'],
          [nowSize(90), '50%'],
          {
            icon: 'circle',
            padding: nowSize(2),
            itemGap: nowSize(20),
            itemWidth: nowSize(10),
            right: nowSize(1),
            formatter: (name) => {
              let times = 0
              this.pieData.forEach(e => {
                if (e.name === name) {
                  times = e.value
                }
              })
              let emp = '  '
              // if (name === '110kv') {
              //   emp = '  '
              // } else if (name === '其他') {
              //   emp = '     '
              // }
              return name + emp + times + '次'
            },
            textStyle: {
              fontWeight: 900,
              fontSize: nowSize(14)
            }
          },
          true,
          ['#27a6ef', '#ea7588', '#cccccc'],
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
.c-charts
  width 288px
  height 180px
</style>
