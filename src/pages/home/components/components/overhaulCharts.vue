<template>
  <div class="bar-charts" ref="barCharts"></div>
</template>

<script>
import Echarts from 'echarts/lib/echarts'
import { barOptions, nowSize } from '@/utils/chartsOptions'
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
export default {
  props: ['data'],
  data () {
    return {
      barCharts: null
    }
  },
  mounted () {
    this.barCharts = Echarts.init(this.$refs.barCharts)
    this.initChartsOptions()
  },
  watch: {
    data () {
      this.initChartsOptions()
    }
  },
  methods: {
    initChartsOptions () {
      this.barCharts.setOption(
        barOptions(
          '',
          ['计划外', '取消', '延期', '提前报竣工', '正常'],
          '',
          {
            names: [''],
            data: [this.data]
          },
          [new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00c6f8' },
            { offset: 1, color: '#00cbb8' }
          ])],
          nowSize(14),
          nowSize(14),
          nowSize(12)
        )
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
.bar-charts
  width 480px
  height 228px
</style>
