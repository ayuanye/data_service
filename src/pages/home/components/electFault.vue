<template>
  <div class="fault">
    <r-title text="电网故障"/>
    <div class="charts-wrapper">
      <div class="desc">
        <p>
          <span class="color-self-orange">当日：</span>
          <span class="number">{{numData.day}}</span>
          个
        </p>
        <p>
          <span class="color-self-blue">当月：</span>
          <span class="number">{{numData.month}}</span>
          个
        </p>
        <p>
          <span class="color-self-green">当年：</span>
          <span class="number">{{numData.year}}</span>
          个
        </p>
      </div>
      <vcc style="margin-left: 90px;" :data="vccData"/>
      <ccc :data="cccData"/>
    </div>
    <r-corner pathName="faultTrip"/>
  </div>
</template>

<script>
import corner from './components/corner'
import vcc from './components/voltageCountCharts'
import ccc from './components/cioncideCountCharts'
import title from './title'
import { getFault } from '@/services/index'
import { dateFormat } from '@/utils/tools'
export default {
  components: {
    'r-corner': corner,
    'r-title': title,
    vcc,
    ccc
  },
  data () {
    return {
      numData: {
        day: '',
        month: '',
        year: ''
      },
      vccData: [],
      cccData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      let param = {
        dayTime: dateFormat('YYYY-mm-dd', new Date()),
        monthTime: dateFormat('YYYY-mm-dd', new Date(new Date().setDate(1))),
        yearTime: new Date().getFullYear() + '-01-01'
      }
      getFault(param).then(res => {
        let obj = {
          day: res.day.num,
          month: res.month.num,
          year: res.year.num
        }
        this.numData = obj
        this.vccData = res.dydjData
        this.cccData = res.chqkData
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins'
.fault
  position relative
  padding 15px 10px
  width 100%
  box-sizing border-box
  background-color white
  .charts-wrapper
    height 200px
    margin 20px 0 20px 38px
    border-radius 20px
    border 1px dashed #dbdbdb
    border-right none
    position relative
    background-image linear-gradient(to right, #f5f5f5, white)
    display flex
    justify-content space-around
    align-items center
    .desc
      width 120px
      height 130px
      box-sizing border-box
      position absolute
      top 35px
      left -33px
      background-color white
      border 1px dashed #dbdbdb
      border-radius 20px
      padding 5px 0
      display flex
      flex-direction column
      justify-content space-around
      align-items center
      font-size 14px
      color #909090
      font-weight bold
      .number
        font-size 15px
        color #444444
</style>
