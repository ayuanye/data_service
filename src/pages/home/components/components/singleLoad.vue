<template>
  <div class="single" ref="singleLoad">
    <div class="left" :style="{ 'background-image': imgUrl }">
      {{dateName}}
    </div>
    <div class="right">
      <p>
        最大
        <span class="number">{{cap | bitRetain | validate}}</span>
        万千瓦
      </p>
      <p class="showtime">
        <span style="white-space:nowrap;">出现时间：</span>
        <span class="time" ref="showTime">{{time | validate | timeValid}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import year from '@/assets/images/title-bg-green.png'
import month from '@/assets/images/title-bg-blue.png'
import day from '@/assets/images/title-bg-orange.png'
export default {
  props: ['date', 'cap', 'time'],
  filters: {
    validate (val) {
      return val || '-'
    },
    timeValid (val) {
      // if (val !== '-' && val.length > 10) {
      //   return val.substring(0, 10)
      // } else {
      //   return val
      // }
      return val
    },
    bitRetain (val) {
      return val ? Number(val).toFixed(2) : val
    }
  },
  mounted () {
    if (this.$refs.singleLoad.parentNode.offsetWidth <= 836) {
      this.$refs.showTime.style.width = '100px'
    }
  },
  computed: {
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
    .showtime
      display flex
      justify-content flex-start
      margin-top 5px
    .number
      color #444
      font-size 15px
      font-weight bold
    .time
      color #444444
      font-size 15px
</style>
