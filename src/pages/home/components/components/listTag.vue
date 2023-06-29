<template>
  <div class="tag" :style="{ backgroundColor: backColor }">
    <div class="icon" :style="{ backgroundColor: circleColor }">
      <i :class="['iconfont', fontClass]"></i>
    </div>
    <div class="desc">
      <p class="number" :style="{ color: numberColor }">{{number}}</p>
      <p class="text">{{text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['fontClass', 'text', 'number', 'backColor', 'circleColor', 'numberColor']
}
</script>

<style lang="stylus" scoped>
.tag
  width 154px
  height 80px
  display flex
  justify-content flex-start
  align-items center
  border-radius 10px
  .icon
    width 29px
    height 29px
    border-radius 50%
    display flex
    justify-content center
    align-items center
    color white
    margin-left 27px
    .iconfont
      font-size 16px
  .desc
    margin-left 10px
    font-size 15px
    .number
      font-weight bold
      font-size 20px
    .text
      font-size 14px
</style>
