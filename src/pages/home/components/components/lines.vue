<template>
  <div class="line-wrapper" :style="{ backgroundColor: backColor }">
    <div class='icon' :style="{ backgroundColor: circleColor }">
      <i :class="['iconfont', fontClass]"></i>
    </div>
    <div class="concrete">
      {{text}}
      <span class="number" :style="{ color: numberColor }">{{num}}</span>
      {{unit}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['fontClass', 'backColor', 'circleColor', 'numberColor', 'text', 'unit', 'num']
}
</script>

<style lang="stylus" scoped>
.line-wrapper
  width 326px
  height 48px
  border-radius 60px
  background #dff4f7
  display flex
  justify-content flex-start
  align-items center
  .icon
    width 37px
    height 37px
    border-radius 50%
    background #1ac8ce
    margin-left 8px
    display flex
    justify-content center
    align-items center
    .iconfont
      color white
      font-size 20px
  .concrete
    margin-left 57px
    .number
      padding 4px 11px
      border-radius 4px
      background white
      font-size 17px
      font-weight bold
      margin 0 9px
</style>
