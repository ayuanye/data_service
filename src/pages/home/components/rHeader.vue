<template>
  <header>
    <div class="left">
      <img class="logo" :src="logo" alt="" />
      <h1 class="title">宜兴电网运行智能分析系统</h1>
    </div>
    <div class="right">
      <!-- <span class="text">调度安全运行</span>
      <span class="number" v-for="(item, index) in runDayToArray" :key="index">
        {{item}}
      </span>
      <span class="text">天</span> -->
    </div>
  </header>
</template>

<script>
import logo from '@/assets/images/logo_green.png'
import { getRuntimeDays } from '@/services/index'
export default {
  data () {
    return {
      logo: logo,
      runDay: 0
    }
  },
  created () {
    this.getDays()
  },
  computed: {
    runDayToArray () {
      return this.runDay.toString().split('')
    }
  },
  methods: {
    getDays () {
      getRuntimeDays().then(res => {
        this.runDay = res.data
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
header
  height 75px
  min-width 1280px
  display flex
  justify-content space-between
  align-items center
  .left
    margin-left 150px
    display flex
    justify-content flex-start
    align-items center
    .logo
      width 134px
    .title
      margin-left 15px
      font-weight bold
      font-size 30px
      color #434343
  .right
    display flex
    justify-content flex-start
    align-items center
    color #444
    font-size 20px
    font-weight bold
    margin-right 20px
    .number
      display inline-block
      width 20px
      height 40px
      background-image url("~@/assets/images/radiusRect.png")
      background-size 100% 50%
      font-family DS-Digital
      margin 0 5px
      font-size 27px
      color white
      font-weight 100
      text-align center
    .text
      margin-left 1px
</style>
