<template>
  <div class="power">
    <r-title wid="130px" text="当日电网检修"/>
    <div class="condition">
      <div class="list">
        <single-list :data="singleListData"/>
      </div>
      <overhaul-charts :data="overhaulChartsData"/>
    </div>
    <r-corner/>
  </div>
</template>

<script>
import corner from './components/corner'
import singleList from './components/singleList'
import overhaulCharts from './components/overhaulCharts'
import title from './title'
import { getPowerOverhaul } from '@/services/index'
import { dateFormat } from '@/utils/tools'
export default {
  components: {
    'r-title': title,
    'r-corner': corner,
    'single-list': singleList,
    'overhaul-charts': overhaulCharts
  },
  data () {
    return {
      singleListData: [],
      overhaulChartsData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getPowerOverhaul({
        time: dateFormat('YYYY-mm-dd', new Date())
      }).then(res => {
        let data = res.data
        this.singleListData = [data.Amount, data.WWCCount, data.YJGCount, data.WXYCount]
        this.overhaulChartsData = [data.JHWCount, data.QXCount, data.YQCount, data.TQJGCount, data.ZCCount]
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.power
  position relative
  padding 15px 10px
  width 100%
  background-color white
  box-sizing border-box
  .condition
    margin-top 20px
    display flex
    justify-content space-around
    align-items center
</style>
