<!-- created by rbb-->
<template>
  <div ref="pieCharts" class="pie-charts"></div>
</template>

<script>
import Echarts from 'echarts/lib/echarts'
import { pieOptions } from '@/utils/chartsOptions'
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
export default {
  props: ['pieData'],
  data () {
    return {
      pieCharts: null
    }
  },
  watch: {
    pieData (val) {
      this.initCharts(val)
    }
  },
  methods: {
    initCharts (data) {
      this.pieCharts = Echarts.init(this.$refs.pieCharts)
      let arr = []
      Object.keys(data).forEach(e => {
        arr.push({
          name: e,
          value: data[e]
        })
      })
      this.pieCharts.setOption(
        pieOptions(
          '',
          arr,
          ['40%', '60%'],
          ['50%', '50%'],
          {
            show: false
          },
          true,
          ['#15cbb8', '#3ca2e2', '#f2dc77'],
          {},
          {
            normal: {
              show: true,
              formatter: '{d}%\n{b}'
            },
            emphasis: {
              show: true
            }
          }
        )
      )
    }
  }
}
</script>
<style lang="stylus" scoped>
.pie-charts
  height 300px
</style>
