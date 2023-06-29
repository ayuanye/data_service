<template>
  <div class="cap">
    <r-title wid="205px" text="负荷电量(截止到昨日)"/>
    <div class="load">
      <div class="name">
        <p>调度</p>
        <p>负荷</p>
      </div>
      <single-load
      :cap="loadCapData.zgfhYear"
      :time="loadCapData.zgfhYearCxsj"
      date="year"
      style="margin-left: 20px;"/>
      <single-load
      :cap="loadCapData.zgfhMonth"
      :time="loadCapData.zgfhMonthCxsj"
      date="month"/>
      <single-load
      :cap="loadCapData.zgfhDay"
      :time="loadCapData.zfghDayCxsj"
      date="day"/>
    </div>
    <div class="elec">
      <div class="name">
        <p>调度</p>
        <p>电量</p>
      </div>
      <single-elect
      :elect="loadCapData.dlYear"
      :compElect="loadCapData.dlYearTb"
      :perc="loadCapData.dlYearTbzzl"
      date="year"
      style="margin-left: 20px;"/>
      <single-elect
      :elect="loadCapData.dlMonth"
      :compElect="loadCapData.dlMonthTb"
      :perc="loadCapData.dlMonthTbzzl"
      date="month"/>
      <single-elect
      :elect="loadCapData.dlDay"
      :compElect="loadCapData.dlDayTb"
      :perc="loadCapData.dlDayTbzzl"
      date="day"/>
    </div>
    <r-corner/>
  </div>
</template>

<script>
import corner from './components/corner'
import singleLoad from './components/singleLoad'
import singleElect from './components/singleElect'
import title from './title'
import { getLoadCapData } from '@/services/index'
export default {
  components: {
    'r-corner': corner,
    'r-title': title,
    'single-load': singleLoad,
    'single-elect': singleElect
  },
  data () {
    return {
      loadCapData: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getLoadCapData({
        time: this.$store.state.home.queryTime
      }).then(res => {
        this.loadCapData = res.data
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.cap
  position relative
  padding 10px
  background-color white
  width 100%
  box-sizing border-box
  .load
    margin-top 20px
    display flex
    justify-content space-between
    align-items center
  .elec
    margin-top 20px
    margin-bottom 20px
    display flex
    justify-content space-between
    align-items center
  // .title
  //   font-weight bold
  //   font-size 0.9vw
  //   width 5.5vw
  //   background-image url('~@/assets/images/title_bg.png')
  //   background-size 100% 110%
  //   text-indent 0.5vw
  //   background-position -0.5vw 0
  //   background-repeat no-repeat
  .name
    width 55px
    height 60px
    font-size 15px
    background-image url('~@/assets/images/title-bg-2.png')
    background-size 100% 100%
    display flex
    flex-direction column
    justify-content center
    align-items center
    font-weight bold
    color #009fa1
</style>
