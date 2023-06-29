<!-- created by rbb-->
<template>
  <div class="count-bar" ref="countBar"></div>
</template>

<script>
import Echarts from 'echarts/lib/echarts'
import { barOptions } from '@/utils/chartsOptions'
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
export default {
  props: ['barData', 'startTime', 'endTime', 'classification'],
  data () {
    return {
      barCharts: null
    }
  },
  watch: {
    barData (val) {
      this.initCharts(val)
    }
  },
  methods: {
    initCharts (data) {
      this.barCharts = Echarts.init(this.$refs.countBar)
      if (data.length !== 0) {
        let copyData = data.filter((v, index) => {
          return index !== 0
        })
        this.barCharts.setOption(
          barOptions(
            '',
            data[0],
            '',
            {
              names: ['跳闸次数', '重合成功', '重合不成', '接地拉停'],
              data: [...copyData]
            },
            ['#3babdf', '#15cbb8', '#f28888', '#afcadb'],
            '',
            '',
            '',
            {
              top: '18%',
              left: '3%',
              width: '95%'
            }
          )
        )
      }
      this.barCharts.off('click')
      this.barCharts.on('click', (param) => {
        this.$router.push({
          name: 'faultCountInfo',
          params: {
            name: param.name,
            startTime: this.startTime,
            endTime: this.endTime,
            classification: this.classification
          }
        }).catch(err => err)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.count-bar
  width 100%
  height 300px
</style>
