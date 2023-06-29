<template>
  <div class="single">
    <div class="left" :style="{ 'background-image': imgUrl }">
      {{dateName}}
    </div>
    <div class="right">
      <p>
        电量
        <span class="number">{{elect | bitRetain | validate}}</span>
        万千瓦时
      </p>
      <p>
        同比:
        <span class="number">{{compElect | bitRetain | validate}}</span>
        万千瓦时
        <span class="perc-reduce" v-if="isReduce">{{perc | validate}}%↓</span>
        <span class="perc-rise" v-if="!isReduce">{{perc | validate}}%↑</span>
      </p>
    </div>
  </div>
</template>

<script>
import year from '@/assets/images/title-bg-green.png'
import month from '@/assets/images/title-bg-blue.png'
import day from '@/assets/images/title-bg-orange.png'
export default {
  props: ['date', 'elect', 'compElect', 'perc'],
  filters: {
    validate (val) {
      return val || '-'
    },
    bitRetain (val) {
      return val ? Number(val).toFixed(2) : val
    }
  },
  computed: {
    isReduce () {
      return this.perc && Number(this.perc) < 0
    },
    imgUrl () {
      let date = ''
      switch (this.date) {
        case 'year': date = year; break
        case 'month': date = month; break
        case 'day': date = day; break
        default: date = year
      }
      return `url(${date})`
    },
    dateName () {
      let dateName = ''
      switch (this.date) {
        case 'year': dateName = '年'; break
        case 'month': dateName = '月'; break
        case 'day': dateName = '日'; break
        default: dateName = '年'
      }
      return dateName
    }
  }
}
</script>

<style lang="stylus" scoped>
.single
  display flex
  justify-content flex-start
  align-items center
  margin-left 10px
  min-width 245px
  width 30%
  .left
    width 38px
    height 38px
    text-align center
    line-height 38px
    color white
    font-weight bold
    font-size 15px
    background-size 100% 100%
  .right
    margin-left 10px
    height 50px
    display flex
    flex-direction column
    justify-content space-between
    align-items flex-start
    font-size 14px
    color #666
    .number
      color #444
      font-size 15px
      font-weight bold
    .perc-rise
      color #ec7573
    .perc-reduce
      color rgb(10, 205, 166)
</style>
