<!-- created by rbb-->
<template>
  <div class="single-scale">
    <div class="item-wrapper" :style="{backgroundImage: 'url(' + back + ')'}">
      <p class="name-wrapper">
        <span>{{electName}}</span>
        <span class="number">{{electNumber}}</span>
        <span>{{unit}}</span>
      </p>
      <img :src="arrow" alt="">
    </div>
    <div class="elect-desc" v-for="(item, index) in lines" :key="item">
      <span class="bold">{{item}}</span>
      <span class="bold number" :style="{color: lineNnumColor}">{{linesNumber ? linesNumber[index] : '0'}}</span>
      <span>{{unit}}</span>
    </div>
  </div>
</template>

<script>
import arrow from '@/assets/images/circle_arrow.png'
export default {
  props: ['electName', 'electNumber', 'back', 'linesNumber', 'lineNnumColor', 'unit'],
  data () {
    return {
      arrow,
      lines: ['220kV', '110kV', '35kV']
    }
  },
  components: {},
  methods: {}
}
</script>
<style lang='stylus' scoped>
.single-scale
  background-image linear-gradient(to right, #eee, white)
  display flex
  justify-content space-between
  align-items center
  .item-wrapper
    width 173px
    height 58px
    display flex
    justify-content space-around
    align-items center
    background-size 100% 100%
    .name-wrapper
      color white
      font-weight bold
      font-size 15px
      .number
        padding 0 9px
        font-size 16px
  .elect-desc
    width 134px
    height 38px
    background-color white
    display flex
    justify-content center
    align-items center
    margin-left 38px
    font-size 14px
    .bold
      font-weight bold
    .number
      padding 0 9px
      font-size 16px
</style>
